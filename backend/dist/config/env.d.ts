import "dotenv/config";
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    GROQ_API_KEY?: string | undefined;
};
