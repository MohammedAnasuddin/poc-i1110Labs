import type { SpeechRecognitionResult, SpeechSynthesisResult } from "./speech.types.js";
export interface SpeechToTextProvider {
    transcribe(audioPath: string): Promise<SpeechRecognitionResult>;
}
export interface TextToSpeechProvider {
    synthesize(text: string): Promise<SpeechSynthesisResult>;
}
