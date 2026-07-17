import type { Request, Response } from "express";
import { analyticsService } from "../container.js";

export async function getAnalyticsController(req: Request, res: Response) {
  const analytics = await analyticsService.getAnalytics();

  res.json(analytics);
}

export async function getConversationAnalyticsController(
  req: Request,
  res: Response,
) {
  const conversations = await analyticsService.getConversationAnalytics();

  res.json(conversations);
}
