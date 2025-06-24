// index.js (or app.js)
import cors from "cors";
import express from "express";

import { PORT } from "./constants/env.constants.js";
import { ROUTES } from "./constants/routes.constants.js";
import counterRouter from "./routes/counter.routes.js";
import noteRouter from "./routes/note.routes.js";
import redisRouter from "./routes/redis.routes.js";

const app = express();

app.use(express.json());

app.use(cors({}));

app.use(ROUTES.REDIS.PATH, redisRouter);

app.use(ROUTES.COUNTER.PATH, counterRouter);

app.use(ROUTES.NOTES.PATH, noteRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:3001");
});
