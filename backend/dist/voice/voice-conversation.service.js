"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceConversationService = void 0;
const speech_utils_js_1 = require("./speech.utils.js");
class VoiceConversationService {
    stt;
    ai;
    tts;
    constructor(stt, ai, tts) {
        this.stt = stt;
        this.ai = ai;
        this.tts = tts;
    }
    async converse(sessionId, audioPath) {
        const startedAt = Date.now();
        const { transcript } = await this.stt.transcribe(audioPath);
        const response = await this.ai.processMessage(sessionId, transcript);
        const speech = await this.tts.synthesize((0, speech_utils_js_1.prepareForSpeech)(response.message));
        console.log(`Voice pipeline: ${Date.now() - startedAt} ms`);
        return {
            transcript,
            response: response.message,
            audio: speech.audio,
            mimeType: speech.mimeType,
        };
    }
}
exports.VoiceConversationService = VoiceConversationService;
//# sourceMappingURL=voice-conversation.service.js.map