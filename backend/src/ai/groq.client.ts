import Groq from "groq-sdk";

import { env } from "../config/env.js";

export const groqClient = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export const DEFAULT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

export const DEFAULT_COMPLETION_OPTIONS = {
  model: DEFAULT_MODEL,
  temperature: 0.2,
  max_completion_tokens: 1024,
} as const;
