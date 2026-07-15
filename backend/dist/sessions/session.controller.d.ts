import type { Request, Response, NextFunction } from "express";
import type { CreateSessionResponse } from "./session.types.js";
export declare function createSessionController(_req: Request, res: Response<CreateSessionResponse>, next: NextFunction): void;
