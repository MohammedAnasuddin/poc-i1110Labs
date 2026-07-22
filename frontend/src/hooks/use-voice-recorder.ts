import { useEffect, useRef, useState } from "react";

import { sendVoice } from "@/api/voice.api";
import type { VoiceState } from "@/types/voice";

export function useVoiceRecorder(sessionId: string) {
  const [state, setState] = useState<VoiceState>("idle");
  const [duration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stateRef = useRef<VoiceState>("idle");
  const conversationActiveRef = useRef(false);

  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const silenceFrameRef = useRef<number | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  function cleanup() {
    chunksRef.current = [];

    if (silenceFrameRef.current) {
      cancelAnimationFrame(silenceFrameRef.current);
    }

    analyserRef.current?.disconnect();

    if (audioContextRef.current?.state !== "closed") {
      audioContextRef.current?.close();
    }

    analyserRef.current = null;
    audioContextRef.current = null;
  }

  function monitorSilence(stream: MediaStream) {
    const context = new AudioContext();

    audioContextRef.current = context;

    const source = context.createMediaStreamSource(stream);

    const analyser = context.createAnalyser();

    analyser.fftSize = 2048;

    source.connect(analyser);

    analyserRef.current = analyser;

    const data = new Uint8Array(analyser.fftSize);

    let silenceStarted = 0;

    const recordingStarted = Date.now();

    function loop() {
      if (!analyserRef.current) return;

      analyserRef.current.getByteTimeDomainData(data);

      let sum = 0;

      for (const value of data) {
        const x = (value - 128) / 128;

        sum += x * x;
      }

      const volume = Math.sqrt(sum / data.length);

      if (Date.now() - recordingStarted < 1500) {
        silenceFrameRef.current = requestAnimationFrame(loop);

        return;
      }

      if (volume < 0.015) {
        if (!silenceStarted) {
          silenceStarted = Date.now();
        }

        if (Date.now() - silenceStarted > 1200) {
          stopRecording();

          return;
        }
      } else {
        silenceStarted = 0;
      }

      silenceFrameRef.current = requestAnimationFrame(loop);
    }

    loop();
  }

  async function playResponse(blob: Blob) {
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);

    audioRef.current = audio;

    audio.onplay = () => {
      setState("speaking");
    };

    audio.onended = () => {
      console.log("🔊 AI finished speaking");

      URL.revokeObjectURL(url);

      audioRef.current = null;

      setState("idle");

      console.log("Conversation active:", conversationActiveRef.current);

      if (conversationActiveRef.current) {
        console.log("⏳ Restarting recorder...");

        setTimeout(() => {
          console.log("🎤 Calling startRecording()");
          startRecording();
        }, 300);
      }
    };

    audio.onerror = () => {
      URL.revokeObjectURL(url);

      audioRef.current = null;

      cleanup();

      setState("idle");
    };

    await audio.play();
  }

  async function startRecording() {
    console.log(
      "startRecording()",
      stateRef.current,
      conversationActiveRef.current,
    );
    cleanup();

    mediaRecorderRef.current = null;

    if (mediaRecorderRef.current?.state === "recording") {
      return;
    }

    if (!sessionId) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : undefined;

      const recorder = new MediaRecorder(
        stream,
        mimeType
          ? {
              mimeType,
            }
          : undefined,
      );

      mediaRecorderRef.current = recorder;

      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType,
        });

        setAudioBlob(blob);

        stream.getTracks().forEach((track) => track.stop());

        setState("thinking");

        try {
          const response = await sendVoice(sessionId, blob);

          await playResponse(response);
        } catch (error) {
          console.error(error);

          cleanup();

          setState("idle");
        }
      };

      recorder.start();
      monitorSilence(stream);

      setState("listening");
    } catch (error) {
      console.error(error);

      cleanup();

      setState("idle");
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    if (recorder.state !== "recording") return;

    recorder.stop();
  }

  function startConversation() {
    conversationActiveRef.current = true;

    startRecording();
  }

  function endConversation() {
    conversationActiveRef.current = false;

    stopRecording();

    audioRef.current?.pause();

    cleanup();

    setState("idle");
  }

  return {
    state,
    duration,
    audioBlob,
    startConversation,
    endConversation,
    stopRecording,
  };
}
