export interface SpeechRecognitionResult {
  transcript: string;
  confidence?: number;
}

export interface SpeechSynthesisResult {
  audio: Buffer;
  mimeType: string;
}
