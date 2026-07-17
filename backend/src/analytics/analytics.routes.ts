import { Router } from "express";
import { getAnalyticsController } from "./analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.get("/", getAnalyticsController);
