export interface ToolSuccess<T> {
    success: true;
    data: T;
}
export interface ToolFailure {
    success: false;
    error: string;
}
export type ToolResult<T> = ToolSuccess<T> | ToolFailure;
