"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribeController = transcribeController;
exports.speakController = speakController;
exports.conversationController = conversationController;
const promises_1 = __importDefault(require("node:fs/promises"));
const promises_2 = require("node:fs/promises");
const container_js_1 = require("../../container.js");
const container_js_2 = require("../../container.js");
const container_js_3 = require("../../container.js");
async function transcribeController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No audio file uploaded.",
            });
        }
        console.log(req.file);
        const result = await container_js_1.speechToTextService.transcribe(req.file.path);
        return res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to transcribe audio.",
        });
    }
    finally {
        if (req.file) {
            await promises_1.default.unlink(req.file.path).catch(() => { });
        }
    }
}
async function speakController(req, res) {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required.",
            });
        }
        const speech = await container_js_2.textToSpeechService.synthesize(text);
        res.setHeader("Content-Type", speech.mimeType);
        res.setHeader("Content-Length", speech.audio.length);
        return res.end(speech.audio);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to synthesize speech.",
        });
    }
}
async function conversationController(req, res) {
    try {
        const file = req.file;
        console.log(req.body);
        console.log(req.file);
        const sessionId = req.body.sessionId;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Audio is required.",
            });
        }
        const result = await container_js_3.voiceConversationService.converse(sessionId, file.path);
        res.setHeader("Content-Type", result.mimeType);
        res.setHeader("X-Transcript", encodeURIComponent(result.transcript));
        res.setHeader("X-Response", encodeURIComponent(result.response));
        return res.send(result.audio);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Voice conversation failed.",
        });
    }
    finally {
        if (req.file) {
            await (0, promises_2.unlink)(req.file.path).catch(() => { });
        }
    }
}
//# sourceMappingURL=voice.controller.js.map