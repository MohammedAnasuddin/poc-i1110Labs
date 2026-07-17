"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToSpeechService = void 0;
class TextToSpeechService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    synthesize(text) {
        return this.provider.synthesize(text);
    }
}
exports.TextToSpeechService = TextToSpeechService;
//# sourceMappingURL=text-to-speech.service.js.map