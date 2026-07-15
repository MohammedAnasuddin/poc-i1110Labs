import Groq from "groq-sdk";
export declare const groqClient: Groq;
export declare const DEFAULT_MODEL = "llama-3.1-8b-instant";
export declare const DEFAULT_COMPLETION_OPTIONS: {
    readonly model: "llama-3.1-8b-instant";
    readonly temperature: 0.2;
    readonly max_completion_tokens: 1024;
};
