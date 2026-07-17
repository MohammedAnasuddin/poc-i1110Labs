"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeTTSProvider = void 0;
const node_buffer_1 = require("node:buffer");
const edge_tts_universal_1 = require("edge-tts-universal");
class EdgeTTSProvider {
    voice = "en-US-AndrewMultilingualNeural";
    async synthesize(text) {
        const tts = new edge_tts_universal_1.EdgeTTS(text, this.voice);
        const result = await tts.synthesize();
        return {
            audio: node_buffer_1.Buffer.from(await result.audio.arrayBuffer()),
            mimeType: "audio/mpeg",
        };
    }
}
exports.EdgeTTSProvider = EdgeTTSProvider;
//# sourceMappingURL=edge-tts.provider.js.map