import express from 'express';
import InMemoryStorage from './users/in-memory-storage';
import UserService from './users/service';

const app = express();
app.use(express.json());

const userStorage = new InMemoryStorage();
const userService = new UserService(userStorage);

userService.createUser(
    'user1', 'password', 18
);
userService.createUser(
    'user12', 'password', 18
);
userService.createUser(
    'user123', 'password', 18
);
userService.createUser(
    'user321', 'password', 18
);
userService.createUser(
    '123321', 'password', 18
);

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
        limit: req.query.limit,
        s: req.query.loginSubstring
    };

    const users = userService.getUsers(userData.s, userData.limit);
    res.json(users);
});

app.delete('/user/:id', (req, res) => {
    // TODO: add validation
    const userData = req.params;

    const user = userService.getUserByID(userData.id);
    userService.deleteUser(user);
    res.end();
});

app.patch('/user/:id', (req, res) => {
    // TODO: add validation
    // Restrict of updating id
    const params = req.params;
    const userData = req.body;

    const user = userService.getUserByID(params.id);
    const newUser = { ...user, ...userData };
    userService.updateUser(newUser);
    res.json(newUser);
});

export default app;
