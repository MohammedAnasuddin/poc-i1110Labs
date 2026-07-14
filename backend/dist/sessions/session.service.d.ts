import { type Session } from "./session.types.js";
export declare class SessionService {
    private readonly sessions;
    createSession(): Session;
    getSession(sessionId: string): Session;
    hasSession(sessionId: string): boolean;
    endSession(sessionId: string): void;
    resetSession(sessionId: string): void;
    getAllSessions(): Session[];
}
