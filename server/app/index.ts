import express from "express";

import { userRouter } from "../users";
import groupRouter from "../groups/routers/router";
import { exceptionHandler, requestLogger } from "../middleware";
import { logger } from "../shared/logging";

const app = express();

app.use(express.json());

app.use(requestLogger);

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
