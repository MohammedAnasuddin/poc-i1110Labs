import type { ToolFailure, ToolSuccess } from "./tool.types.js";
export declare function success<T>(data: T): ToolSuccess<T>;
export declare function failure(error: string): ToolFailure;
