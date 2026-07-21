import cors from "cors";
import express from "express";

import healthRouter from "./routes/health.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import chatRouter from "./features/chat/chat.route.js";
import sessionRouter from "./sessions/session.route";
import { voiceRouter } from "./features/voice/voice.routes.js";
import { analyticsRouter } from "./analytics/analytics.routes.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRouter);
app.use("/api/chat", chatRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/voice", voiceRouter);
app.use("/api/analytics", analyticsRouter);
app.get("/", (_, res) => {
  res.send("AI Voice Ordering Backend 🚀");
});

app.use(errorHandler);

export default app;
