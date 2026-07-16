import Groq from "groq-sdk";
export declare const groqClient: Groq;
export declare const DEFAULT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
export declare const DEFAULT_COMPLETION_OPTIONS: {
    readonly model: "meta-llama/llama-4-scout-17b-16e-instruct";
    readonly temperature: 0.2;
    readonly max_completion_tokens: 1024;
};
