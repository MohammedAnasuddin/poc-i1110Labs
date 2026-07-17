"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechToTextService = void 0;
class SpeechToTextService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    transcribe(audioPath) {
        return this.provider.transcribe(audioPath);
    }
}
exports.SpeechToTextService = SpeechToTextService;
//# sourceMappingURL=speech-to-text.service.js.map