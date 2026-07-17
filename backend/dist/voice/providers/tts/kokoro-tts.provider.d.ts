import type { SpeechSynthesisResult } from "../../speech.types.js";
import type { TextToSpeechProvider } from "../../speech.provider.js";
export declare class KokoroTTSProvider implements TextToSpeechProvider {
    private model?;
    private getModel;
    synthesize(text: string): Promise<SpeechSynthesisResult>;
}
