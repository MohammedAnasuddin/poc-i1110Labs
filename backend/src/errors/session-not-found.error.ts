import { AppError } from "./app-error.js";
import { ErrorCode } from "./error-codes.js";

export class SessionNotFoundError extends AppError {
  constructor(sessionId: string) {
    super(
      `Session '${sessionId}' was not found.`,
      404,
      ErrorCode.SESSION_NOT_FOUND,
    );
  }
}
