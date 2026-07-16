import fs from "node:fs";

import { groqClient } from "../../ai/groq.client.js";

import type { SpeechRecognitionResult } from "../speech.types.js";

import type { SpeechToTextProvider } from "../speech.provider.js";

export class GroqSpeechToTextProvider implements SpeechToTextProvider {
  async transcribe(audioPath: string): Promise<SpeechRecognitionResult> {
    const transcription = await groqClient.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3-turbo",
      language: "en",
    });

    return {
      transcript: transcription.text,
    };
  }
}
