import cors from "cors";
import express from "express";

import healthRouter from "./routes/health.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRouter);

app.use(errorHandler);

export default app;
