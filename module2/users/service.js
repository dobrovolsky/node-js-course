import User from './model';
import { v4 as uuidv4 } from 'uuid';
import InMemoryStorage from './in-memory-storage';

const userStorage = new InMemoryStorage();


class UserService {
    constructor(storage) {
        this.storage = storage;
    }

    createUser(login, password, age) {
        // TODO: add password hashing
        const user = new User(uuidv4(), login, password, age);
        return this.storage.create(user);
    }

    deleteUser(user) {
        user.isDeleted = true;
        return this.storage.update(user);
    }

    updateUser(user) {
        return this.storage.update(user);
    }

    getUserByID(id) {
        return this.storage.getByID(id);
    }


    getUsers(searchTerm, limit) {
        return this.storage.getUsers(searchTerm, limit);
    }
}


export const userService = new UserService(userStorage);
