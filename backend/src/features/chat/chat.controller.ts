import type { Request, Response, NextFunction } from "express";

import { aiAgentService } from "../../container.js";

import type { ChatRequest, ChatResponse } from "./chat.types.js";

export async function chatController(
  req: Request<unknown, ChatResponse, ChatRequest>,
  res: Response<ChatResponse>,
  next: NextFunction,
): Promise<void> {
  try {
    const { sessionId, message } = req.body;

    const response = await aiAgentService.processMessage(sessionId, message);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
