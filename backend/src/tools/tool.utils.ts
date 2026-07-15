import type { ToolFailure, ToolSuccess } from "./tool.types.js";

export function success<T>(data: T): ToolSuccess<T> {
  return {
    success: true,
    data,
  };
}

export function failure(error: string): ToolFailure {
  return {
    success: false,
    error,
  };
}