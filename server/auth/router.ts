import express from "express";
import { authService } from "./auth-service";
import { userService } from "../users";
import { NotFoundError } from "../shared/exceptions";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const userData = req.body;
  let user;
  try {
    user = await userService.getUserByLoginPassword(
      userData.login,
      userData.password
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.json({ message: "user with given data does not exists" });
      return res.status(400);
    }
    throw e;
  }
  return res.json(await authService.sign(user));
});

export default authRouter;
