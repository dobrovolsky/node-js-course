import express from 'express';

import { NotFoundError } from './exceptions';
import UserValidator from './validator';
import { userService } from './service';

const userValidator =  new UserValidator();

function getOr404(userID, res) {
    try {
        return userService.getUserByID(userID);
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

userRouter.get('/', (req, res) => {
    const userData = {
        limit: req.query.limit,
        s: req.query.loginSubstring
    };

    const users = userService.getUsers(userData.s, userData.limit);
    res.json(users);
});

userRouter.post('/', (req, res) => {
    const userData = req.body;

    const validator = userValidator.validateCreation(userData);
    if (!validator.isValid) {
        res.status(400).json(validator.errors);
        return;
    }

    const user = userService.createUser(
        userData.login, userData.password, userData.age
    );
    res.json(user);
});

userRouter.get('/:id', (req, res) => {
    const userData = req.params;
    const user = getOr404(userData.id, res);
    if (!user) {
        return;
    }

    res.json(user);
});

userRouter.delete('/:id', (req, res) => {
    const userData = req.params;

    const user = getOr404(userData.id, res);
    if (!user) {
        return;
    }

    userService.deleteUser(user);
    res.status(204).end();
});

userRouter.patch('/:id', (req, res) => {
    const params = req.params;
    const userData = req.body;

    const validator = userValidator.validateUpdate(userData);
    if (!validator.isValid) {
        res.status(400).json(validator.errors);
        return;
    }

    const user = getOr404(params.id, res);
    if (!user) {
        return;
    }

    const newUser = { ...user, ...userData };
    userService.updateUser(newUser);
    res.json(newUser);
});

export default userRouter;
