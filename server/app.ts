import express from "express";
import { userService, userRouter } from "./users";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

userService.createUser("nodejs", "NodeJS123", 11);
userService.createUser("JavaScript", "javaScript123", 24);
userService.createUser("Python", "Python123", 30);
userService.createUser("Clojure", "(Clojure 1 2 3)", 13);
userService.createUser("ClojureScript", "(ClojureScript 1 2 3)", 13);

export default app;
