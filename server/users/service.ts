import { v4 as uuidv4 } from "uuid";
import UserModel from "./model";
import { userID, IUser, IUserStorage } from "./types";
import PostgreSQLStorage from "./data-access/postgres-storage";

const userStorage = new PostgreSQLStorage();

class UserService {
  private storage: IUserStorage;

  constructor(storage: IUserStorage) {
    this.storage = storage;
  }

  async createUser(
    login: string,
    password: string,
    age: number
  ): Promise<IUser> {
    // TODO: add password hashing
    const user = new UserModel(uuidv4(), login, password, age);
    return await this.storage.create(user);
  }

  async deleteUser(user: IUser): Promise<IUser> {
    user.isDeleted = true;
    return await this.storage.update(user);
  }

  async updateUser(user: IUser): Promise<IUser> {
    return await this.storage.update(user);
  }

  async getUserByID(id: userID): Promise<IUser> {
    return await this.storage.getByID(id);
  }

  async getUsers(searchTerm: string, limit: number): Promise<Array<IUser>> {
    return await this.storage.getUsers(searchTerm, limit);
  }
}

export const userService = new UserService(userStorage);
