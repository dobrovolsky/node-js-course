import express from 'express';
import { userService, userRouter } from './users';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

[
    ['nodejs', 'NodeJS123', 11],
    ['JavaScript', 'javaScript123', 24],
    ['Python', 'Python123', 30],
    ['Clojure', '(Clojure 1 2 3)', 13],
    ['ClojureScript', '(ClojureScript 1 2 3)', 13]
].forEach(item => userService.createUser(...item));

export default app;
