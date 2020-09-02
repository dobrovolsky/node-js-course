import express, { Response } from "express";

import { NotFoundError } from "../exceptions";
import UserValidator from "./validator";
import { userService } from "..";
import { userID } from "../types";
import { IUser } from "../models/interfaces";

const userValidator = new UserValidator();

async function getOr404(userId: userID, res: Response): Promise<IUser | null> {
  try {
    return await userService.getUserByID(userId);
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404);
      res.end();
      return null;
    }
    throw e;
  }
}

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const userData = {
    limit: req.query.limit as string,
    s: req.query.loginSubstring as string,
  };

  const parsedLimit = parseInt(userData.limit);

  let limit = 0;
  if (parsedLimit) {
    limit = parsedLimit;
  }

  const users = await userService.getUsers(userData.s, limit);
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const userData = req.body;

  const validator = userValidator.validateCreation(userData);
  if (!validator.isValid) {
    res.status(400).json(validator.errors);
    return;
  }

  const user = await userService.createUser(
    userData.login,
    userData.password,
    userData.age
  );
  res.json(user);
});

userRouter.get("/:id", async (req, res) => {
  const userData = req.params;
  const user = await getOr404(userData.id, res);
  if (!user) {
    return;
  }

  res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
  const userData = req.params;

  const user = await getOr404(userData.id, res);
  if (!user) {
    return;
  }

  await userService.deleteUser(user);
  res.status(204).end();
});

userRouter.patch("/:id", async (req, res) => {
  const params = req.params;
  const userData = req.body;

  const validator = userValidator.validateUpdate(userData);
  if (!validator.isValid) {
    res.status(400).json(validator.errors);
    return;
  }

  const user = await getOr404(params.id, res);
  if (!user) {
    return;
  }

  const newUser = { ...user, ...userData };
  await userService.updateUser(newUser);
  res.json(newUser);
});

export default userRouter;
