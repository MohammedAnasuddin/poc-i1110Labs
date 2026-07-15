"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_COMPLETION_OPTIONS = exports.DEFAULT_MODEL = exports.groqClient = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const env_js_1 = require("../config/env.js");
exports.groqClient = new groq_sdk_1.default({
    apiKey: env_js_1.env.GROQ_API_KEY,
});
exports.DEFAULT_MODEL = "llama-3.1-8b-instant";
exports.DEFAULT_COMPLETION_OPTIONS = {
    model: exports.DEFAULT_MODEL,
    temperature: 0.2,
    max_completion_tokens: 1024,
};
//# sourceMappingURL=groq.client.js.map