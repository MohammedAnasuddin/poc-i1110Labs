"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KokoroTTSProvider = void 0;
const node_buffer_1 = require("node:buffer");
const kokoro_js_1 = require("kokoro-js");
const node_module_1 = require("node:module");
const required = (0, node_module_1.createRequire)(import.meta.url);
class KokoroTTSProvider {
    model;
    async getModel() {
        console.log("Entering getModel");
        if (!this.model) {
            console.log(required.resolve("kokoro-js"));
            this.model = await kokoro_js_1.KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
                device: "cpu",
                dtype: "q8",
            });
        }
        return this.model;
    }
    async synthesize(text) {
        console.log("Kokoro synthesize called");
        const model = await this.getModel();
        const audio = await model.generate(text, {
            voice: "af_heart",
        });
        return {
            audio: node_buffer_1.Buffer.from(audio.toWav()),
            mimeType: "audio/wav",
            format: "wav",
            sampleRate: audio.sampling_rate,
        };
    }
}
exports.KokoroTTSProvider = KokoroTTSProvider;
//# sourceMappingURL=kokoro-tts.provider.js.map