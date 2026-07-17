import { Router } from "express";

import {
  createSessionController,
  getCartController,
  getConversationController,
  endSessionController
} from "./session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/", createSessionController);
sessionRouter.get("/:sessionId/messages", getConversationController);
sessionRouter.get("/:sessionId/cart", getCartController);
sessionRouter.post("/:sessionId/end", endSessionController);

export default sessionRouter;
