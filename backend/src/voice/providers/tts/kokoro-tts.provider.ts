// import { Buffer } from "node:buffer";

// import { KokoroTTS } from "kokoro-js";

// import type { SpeechSynthesisResult } from "../../speech.types.js";
// import type { TextToSpeechProvider } from "../../speech.provider.js";

// import { createRequire } from "node:module";
// const required = createRequire(import.meta.url);

// export class KokoroTTSProvider implements TextToSpeechProvider {
//   private model?: KokoroTTS;

//   private async getModel() {
//     console.log("Entering getModel");
//     if (!this.model) {
//       console.log(required.resolve("kokoro-js"));

//       this.model = await KokoroTTS.from_pretrained(
//         "onnx-community/Kokoro-82M-v1.0-ONNX",
//         {
//           device: "cpu",
//           dtype: "q8",
//         },
//       );
//     }

//     return this.model;
//   }

//   async synthesize(text: string): Promise<SpeechSynthesisResult> {
//     console.log("Kokoro synthesize called");
//     const model = await this.getModel();

//     const audio = await model.generate(text, {
//       voice: "af_heart",
//     });

//     return {
//       audio: Buffer.from(audio.toWav()),
//       mimeType: "audio/wav",
//       format: "wav",
//       sampleRate: audio.sampling_rate,
//     };
//   }
// }
