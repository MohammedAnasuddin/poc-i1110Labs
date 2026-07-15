import type { Request, Response, NextFunction } from "express";

import { sessionService } from "../container";
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