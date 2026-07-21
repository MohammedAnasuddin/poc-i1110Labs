// import { SpeechToTextProvider } from "./speech.provider";

// export class GroqSpeechProvider
//   implements SpeechToTextProvider
// {
//     async transcribe(audio: Buffer) {

//     }
// }


import type {
  SpeechToTextProvider, 
} from "./speech.provider.js";
import type {SpeechRecognitionResult} from "./speech.types" ;

export class GroqSpeechProvider
  implements SpeechToTextProvider
{
  async transcribe(
    audioPath: string,
  ): Promise<SpeechRecognitionResult> {
    throw new Error("Not implemented.");
  }
}