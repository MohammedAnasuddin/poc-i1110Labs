import { Router } from "express";
import multer from "multer";

import {
  conversationController,
  transcribeController,
} from "./voice.controller.js";
import { speakController } from "./voice.controller.js";

import path from "node:path";

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (_, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, `${Date.now()}${extension}`);
  },
});

const upload = multer({
  storage,

  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("audio/")) {
      return cb(new Error("Only audio files are allowed."));
    }

    cb(null, true);
  },
});

export const voiceRouter = Router();
voiceRouter.post("/transcribe", upload.single("audio"), transcribeController);
voiceRouter.post("/speak", speakController);
voiceRouter.post("/chat", upload.single("audio"), conversationController);
