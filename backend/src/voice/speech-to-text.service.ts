import type { SpeechToTextProvider } from "./speech.provider.js";

export class SpeechToTextService {
  constructor(
    private readonly provider: SpeechToTextProvider,
  ) {}

  transcribe(audioPath: string) {
    return this.provider.transcribe(audioPath);
  }
}