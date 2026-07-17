import type { Request, Response } from "express";
export declare function transcribeController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function speakController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function conversationController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
