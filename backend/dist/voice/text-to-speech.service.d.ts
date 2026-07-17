import type { TextToSpeechProvider } from "./speech.provider.js";
export declare class TextToSpeechService {
    private readonly provider;
    constructor(provider: TextToSpeechProvider);
    synthesize(text: string): Promise<import("./speech.types.js").SpeechSynthesisResult>;
}
