"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqSpeechToTextProvider = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const groq_client_js_1 = require("../../ai/groq.client.js");
class GroqSpeechToTextProvider {
    async transcribe(audioPath) {
        const transcription = await groq_client_js_1.groqClient.audio.transcriptions.create({
            file: node_fs_1.default.createReadStream(audioPath),
            model: "whisper-large-v3-turbo",
            language: "en",
        });
        return {
            transcript: transcription.text,
        };
    }
}
exports.GroqSpeechToTextProvider = GroqSpeechToTextProvider;
//# sourceMappingURL=groq-stt.provider.js.map