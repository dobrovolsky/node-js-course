import User from './model';
import { v4 as uuidv4 } from 'uuid';


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


    getAutoSuggestUsers(searchTerm, limit) {
        return this.storage.getAutoSuggestUsers(searchTerm, limit);
    }
}

export default UserService;
