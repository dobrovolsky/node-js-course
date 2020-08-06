import express from 'express';
import InMemoryStorage from './users/in-memory-storage';
import UserService from './users/service';

const app = express();

const userStorage = new InMemoryStorage();
const userService = new UserService(userStorage);

app.get('/', (req, res) => {
    const user = userService.createUser(
        'bogdan', 'password', 23
    );
    const newUser = userService.getUserByID(user.id);
    res.send(newUser.id);
});

export default app;
