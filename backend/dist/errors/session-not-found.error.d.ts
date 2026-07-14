import { AppError } from "./app-error.js";
export declare class SessionNotFoundError extends AppError {
    constructor(sessionId: string);
}
