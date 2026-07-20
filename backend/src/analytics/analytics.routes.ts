import { Router } from "express";
import {
  getAnalyticsController,
  getConversationAnalyticsController,
  getLogsController
} from "./analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.get("/", getAnalyticsController);
analyticsRouter.get("/conversations", getConversationAnalyticsController);
analyticsRouter.get("/logs", getLogsController);
