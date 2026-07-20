import Groq from "groq-sdk";

import { env } from "../config/env.js";

export const groqClient = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export const DEFAULT_MODEL = "qwen/qwen3.6-27b";

export const DEFAULT_COMPLETION_OPTIONS = {
  model: DEFAULT_MODEL,
  temperature: 0.2,
  max_completion_tokens: 1024,
} as const;
