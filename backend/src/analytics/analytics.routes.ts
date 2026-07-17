import { Router } from "express";
import {
  getAnalyticsController,
  getConversationAnalyticsController,
} from "./analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.get("/", getAnalyticsController);
analyticsRouter.get("/conversations", getConversationAnalyticsController);
