import cors from "cors";
import express from "express";

import healthRouter from "./routes/health.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import chatRouter from "./features/chat/chat.route.js";
import sessionRouter from "./sessions/session.route";
import { voiceRouter } from "./features/voice/voice.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRouter);
app.use("/api/chat", chatRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/voice", voiceRouter);

app.use(errorHandler);

export default app;
