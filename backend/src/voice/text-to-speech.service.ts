import type { TextToSpeechProvider } from "./speech.provider.js";

export class TextToSpeechService {
  constructor(private readonly provider: TextToSpeechProvider) {}

  synthesize(text: string) {
    return this.provider.synthesize(text);
  }
}
