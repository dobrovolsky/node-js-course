import { NextFunction, Request, Response } from "express";
import { requestHeaders } from "../shared/types";
import { authService } from "./auth-service";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = authService.getToken(req.headers as requestHeaders);
  if (token == null) {
    return res.sendStatus(401);
  }
  if (!(await authService.isValid(token))) {
    return res.sendStatus(403);
  }
  next();
};
