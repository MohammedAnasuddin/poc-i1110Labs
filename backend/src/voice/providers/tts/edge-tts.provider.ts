import { Buffer } from "node:buffer";

import { EdgeTTS } from "edge-tts-universal";

import type {
  SpeechSynthesisResult,
} from "../../speech.types.js";

import type {
  TextToSpeechProvider,
} from "../../speech.provider.js";

export class EdgeTTSProvider
  implements TextToSpeechProvider {

  private readonly voice = "en-US-AndrewMultilingualNeural";

  async synthesize(
    text: string,
  ): Promise<SpeechSynthesisResult> {

    const tts = new EdgeTTS(
      text,
      this.voice,
    );

    const result =
      await tts.synthesize();

    return {
      audio: Buffer.from(
        await result.audio.arrayBuffer(),
      ),
      mimeType: "audio/mpeg",
    };
  }
}