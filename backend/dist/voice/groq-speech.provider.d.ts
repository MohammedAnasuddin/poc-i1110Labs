import type { SpeechToTextProvider } from "./speech.provider.js";
import type { SpeechRecognitionResult } from "./speech.types";
export declare class GroqSpeechProvider implements SpeechToTextProvider {
    transcribe(audioPath: string): Promise<SpeechRecognitionResult>;
}
