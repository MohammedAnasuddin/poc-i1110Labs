import type { Request, Response } from "express";
import fs from "node:fs/promises";
import { unlink } from "node:fs/promises";

import { speechToTextService } from "../../container.js";
import { textToSpeechService } from "../../container.js";
import { voiceConversationService } from "../../container.js";

export async function transcribeController(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No audio file uploaded.",
      });
    }
    console.log(req.file);

    const result = await speechToTextService.transcribe(req.file.path);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to transcribe audio.",
    });
  } finally {
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }
}

export async function speakController(req: Request, res: Response) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required.",
      });
    }

    const speech = await textToSpeechService.synthesize(text);

    res.setHeader("Content-Type", speech.mimeType);
    res.setHeader("Content-Length", speech.audio.length);

    return res.end(speech.audio);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to synthesize speech.",
    });
  }
}

export async function conversationController(req: Request, res: Response) {
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

    const result = await voiceConversationService.converse(
      sessionId,
      file.path,
    );

    res.setHeader("Content-Type", result.mimeType);

    res.setHeader("X-Transcript", encodeURIComponent(result.transcript));

    res.setHeader("X-Response", encodeURIComponent(result.response));

    return res.send(result.audio);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Voice conversation failed.",
    });
  }
  finally {
    if (req.file) {
        await unlink(req.file.path).catch(() => {});
    }
  }
}
