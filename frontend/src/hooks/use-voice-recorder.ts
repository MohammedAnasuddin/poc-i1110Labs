import { useRef, useState } from "react";

import { sendVoice } from "@/api/voice.api";
import type { VoiceState } from "@/types/voice";

export function useVoiceRecorder(sessionId: string) {
  const [state, setState] = useState<VoiceState>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function cleanup() {
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }

  async function playResponse(blob: Blob) {
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);

    audioRef.current = audio;

    audio.onplay = () => {
      setState("speaking");
    };

    audio.onended = () => {
      URL.revokeObjectURL(url);

      audioRef.current = null;

      cleanup();

      setState("idle");
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
    if (state !== "idle") return;

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

      mediaRecorderRef.current = recorder;

      recorder.start();

      setState("listening");
    } catch (error) {
      console.error(error);

      cleanup();

      setState("idle");
    }
  }

  function stopRecording() {
    if (state !== "listening") return;

    mediaRecorderRef.current?.stop();
  }

  return {
    state,
    audioBlob,
    startRecording,
    stopRecording,
  };
}
