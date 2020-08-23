import { v4 as uuidv4 } from "uuid";
import InMemoryStorage from "./in-memory-storage";
import IUserStorage from "./storage-interface";
import UserModel from "./model";
import { userID, IUser } from "./types";
const userStorage = new InMemoryStorage();

class UserService {
  private storage: IUserStorage;

  constructor(storage: IUserStorage) {
    this.storage = storage;
  }

  createUser(login: string, password: string, age: number) {
    // TODO: add password hashing
    const user = new UserModel(uuidv4(), login, password, age);
    return this.storage.create(user);
  }

  deleteUser(user: IUser): IUser {
    user.isDeleted = true;
    return this.storage.update(user);
  }

  updateUser(user: IUser): IUser {
    return this.storage.update(user);
  }

  getUserByID(id: userID): IUser {
    return this.storage.getByID(id);
  }

  getUsers(searchTerm: string, limit: number) {
    return this.storage.getUsers(searchTerm, limit);
  }
}

export const userService = new UserService(userStorage);
