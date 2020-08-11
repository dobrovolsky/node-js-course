import express from 'express';
import InMemoryStorage from './users/in-memory-storage';
import UserService from './users/service';

const app = express();
app.use(express.json());

const userStorage = new InMemoryStorage();
const userService = new UserService(userStorage);

app.post('/user', (req, res) => {
    // TODO: add validation
    const userData = req.body;
    const user = userService.createUser(
        userData.login, userData.password, userData.age
    );
    res.json(user);
});

app.get('/user/:id', (req, res) => {
    // TODO: add validation
    const userData = req.params;
    const user = userService.getUserByID(userData.id);
    res.json(user);
});

app.get('/user', (req, res) => {
    // s
    // limit
    // TODO: add validation
    const userData = {
        limit: req.query.limit || 10,
        s: req.query.s
    };
    const users = userService.getAutoSuggestUsers(userData.s, userData.limit);
    res.json(users);
});

app.delete('/user/:id', (req, res) => {
    // TODO: add validation
    const userData = req.params;
    const user = userService.getUserByID(userData.id);
    console.log(user);
    userService.deleteUser(user);
    res.end();
});

// TODO: add update

export default app;
