import { Router } from "express";

import { ROUTES } from "../constants/routes.constants.js";
import { getRedisController } from "../controller/redis.controller.js";

const redisRouter = Router();
const redisController = getRedisController();

redisRouter.get(ROUTES.REDIS.GET_ALL, redisController.getAllKeys);

redisRouter.get(ROUTES.REDIS.GET_ONE, redisController.getRedisValue);

redisRouter.post(ROUTES.REDIS.POST, redisController.addRedisKeyValue);

redisRouter.delete(ROUTES.REDIS.DELETE, redisController.deleteKey);

export default redisRouter;
