import type { SpeechSynthesisResult } from "../../speech.types.js";
import type { TextToSpeechProvider } from "../../speech.provider.js";
export declare class EdgeTTSProvider implements TextToSpeechProvider {
    private readonly voice;
    synthesize(text: string): Promise<SpeechSynthesisResult>;
}
