import { Router } from "express";

import { createSessionController, getCartController, getConversationController } from "./session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/", createSessionController);
sessionRouter.get("/:sessionId/messages", getConversationController);
sessionRouter.get(
  "/:sessionId/cart",
  getCartController,
);

export default sessionRouter;
