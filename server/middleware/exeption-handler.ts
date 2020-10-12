import { NextFunction, Request, Response } from "express";
import { logger } from "../shared/logging";

export function exceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(err);
  res.status(500).send({ error: "Internal Server Error" });
}
