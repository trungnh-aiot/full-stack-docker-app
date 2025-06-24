import { Router } from "express";

import { ROUTES } from "../constants/index.js";
import { getCounterController } from "../controller/counter.controller.js";

const counterRouter = Router();

const counterController = getCounterController();

counterRouter.get(ROUTES.COUNTER.GET, counterController.getCounter);

export default counterRouter;
