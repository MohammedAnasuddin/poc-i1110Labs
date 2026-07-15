export interface AIResponse {
    message: string;
    latency: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
}
