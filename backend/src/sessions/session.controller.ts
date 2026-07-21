import type { Request, Response, NextFunction } from "express";

import { cartService, sessionService } from "../container";
import type { CreateSessionResponse } from "./session.types.js";
import { analyticsService } from "../container";

export function createSessionController(
  _req: Request,
  res: Response<CreateSessionResponse>,
  next: NextFunction,
): void {
  try {
    const session = sessionService.createSession();

    res.status(201).json({
      sessionId: session.id,
    });
  } catch (error) {
    next(error);
  }
}

export async function getConversationController(req: Request, res: Response) {
  const sessionId = req.params.sessionId;

  if (typeof sessionId !== "string") {
    return res.status(400).json({
      error: "Session id required",
    });
  }

  const messages = sessionService.getConversation(sessionId);

  return res.json({
    messages,
  });
}

// controllers/session.controller.ts

export async function getCartController(req: Request, res: Response) {
  const sessionId = req.params.sessionId;

  if (typeof sessionId !== "string") {
    return res.status(400).json({
      error: "Session id required",
    });
  }

  const cart = cartService.getCart(sessionId);

  return res.json(cart);
}

export async function endSessionController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const sessionId = req.params.sessionId;

    if (typeof sessionId !== "string") {
      res.status(400).json({
        error: "Session id required",
      });
      return;
    }

    const session = sessionService.endSession(sessionId);

    console.log("POST /sessions/:id/end", sessionId);

    await analyticsService.recordConversationEnd(session);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
