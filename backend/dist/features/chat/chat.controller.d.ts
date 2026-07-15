import type { Request, Response, NextFunction } from "express";
import type { ChatRequest, ChatResponse } from "./chat.types.js";
export declare function chatController(req: Request<unknown, ChatResponse, ChatRequest>, res: Response<ChatResponse>, next: NextFunction): Promise<void>;
