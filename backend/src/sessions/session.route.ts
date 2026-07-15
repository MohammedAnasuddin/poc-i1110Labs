import { Router } from "express";

import { createSessionController } from "./session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/", createSessionController);

export default sessionRouter;
