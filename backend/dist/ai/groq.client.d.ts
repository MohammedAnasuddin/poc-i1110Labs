import Groq from "groq-sdk";
export declare const groqClient: Groq;
export declare const DEFAULT_MODEL = "qwen/qwen3.6-27b";
export declare const DEFAULT_COMPLETION_OPTIONS: {
    readonly model: "qwen/qwen3.6-27b";
    readonly temperature: 0.2;
    readonly max_completion_tokens: 1024;
};
