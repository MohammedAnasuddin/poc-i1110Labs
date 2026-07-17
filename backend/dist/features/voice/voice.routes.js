"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const voice_controller_js_1 = require("./voice.controller.js");
const voice_controller_js_2 = require("./voice.controller.js");
const node_path_1 = __importDefault(require("node:path"));
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (_, file, cb) => {
        const extension = node_path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (_, file, cb) => {
        if (!file.mimetype.startsWith("audio/")) {
            return cb(new Error("Only audio files are allowed."));
        }
        cb(null, true);
    },
});
exports.voiceRouter = (0, express_1.Router)();
exports.voiceRouter.post("/transcribe", upload.single("audio"), voice_controller_js_1.transcribeController);
exports.voiceRouter.post("/speak", voice_controller_js_2.speakController);
exports.voiceRouter.post("/chat", upload.single("audio"), voice_controller_js_1.conversationController);
//# sourceMappingURL=voice.routes.js.map