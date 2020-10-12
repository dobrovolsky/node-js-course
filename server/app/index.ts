import express from "express";
import cors from "cors";

import { userRouter } from "../users";
import groupRouter from "../groups/routers/router";
import { exceptionHandler, requestLogger } from "../middleware";
import { logger } from "../shared/logging";
import authRouter from "../auth/router";
import config from "../config/config";

const app = express();

app.use(express.json());
app.use(cors({ origin: config.allowedOrigin }));
app.use(requestLogger);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/group", groupRouter);

app.use(exceptionHandler);

process.on("uncaughtException", (err: Error) => {
  logger.error(err);
});

process.on("unhandledRejection", (err: Error) => {
  logger.error(err);
});

export default app;
