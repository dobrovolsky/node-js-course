import express from "express";

import { userRouter } from "../users";
import groupRouter from "../groups/routers/router";
import { requestLogger } from "../middleware/logging";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/user", userRouter);
app.use("/group", groupRouter);

export default app;
