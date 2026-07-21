import type { Request, Response, NextFunction } from "express";
import type { CreateSessionResponse } from "./session.types.js";
export declare function createSessionController(_req: Request, res: Response<CreateSessionResponse>, next: NextFunction): void;
export declare function getConversationController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getCartController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function endSessionController(req: Request, res: Response, next: NextFunction): Promise<void>;
