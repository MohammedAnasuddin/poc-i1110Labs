import type { SpeechRecognitionResult } from "../speech.types.js";
import type { SpeechToTextProvider } from "../speech.provider.js";
export declare class GroqSpeechToTextProvider implements SpeechToTextProvider {
    transcribe(audioPath: string): Promise<SpeechRecognitionResult>;
}
