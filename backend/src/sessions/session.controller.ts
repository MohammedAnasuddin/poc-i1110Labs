import type { Request, Response, NextFunction } from "express";

import { cartService, sessionService } from "../container";
import type { CreateSessionResponse } from "./session.types.js";

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

export async function getConversationController(req, res) {
  const { sessionId } = req.params;

  const messages = sessionService.getConversation(sessionId);

  res.json({
    messages,
  });
}

// controllers/session.controller.ts

export async function getCartController(
  req: Request,
  res: Response,
) {
  const { sessionId } = req.params;

 const cart = cartService.getCart(sessionId);

  res.json(cart);
}