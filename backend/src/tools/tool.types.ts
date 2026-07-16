export interface ToolSuccess<T> {
  success: true;
  data: T;
}

export interface ToolFailure<T = unknown> {
  success: false;
  error: string;
  data?: T;
}

export type ToolResult<T, E = unknown> = ToolSuccess<T> | ToolFailure<E>;
