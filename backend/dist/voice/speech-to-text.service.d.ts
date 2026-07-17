import type { SpeechToTextProvider } from "./speech.provider.js";
export declare class SpeechToTextService {
    private readonly provider;
    constructor(provider: SpeechToTextProvider);
    transcribe(audioPath: string): Promise<import("./speech.types.js").SpeechRecognitionResult>;
}
