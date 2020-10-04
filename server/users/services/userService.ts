import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/userModel";
import { userID } from "../types";
import PostgreSQLStorage from "../data-access/postgres-storage";
import { IUserStorage } from "../data-access/interfaces";
import { IUser } from "../models/interfaces";
import { serviceLogger } from "../../shared/logging";

const userStorage = new PostgreSQLStorage();

class UserService {
  private storage: IUserStorage;

  constructor(storage: IUserStorage) {
    this.storage = storage;
  }

  @serviceLogger
  async createUser(
    login: string,
    password: string,
    age: number
  ): Promise<IUser> {
    // TODO: add password hashing
    const user = new UserModel("text", login, password, age);
    return await this.storage.create(user);
  }

  @serviceLogger
  async deleteUser(user: IUser): Promise<IUser> {
    user.isDeleted = true;
    return await this.storage.update(user);
  }

  @serviceLogger
  async updateUser(user: IUser): Promise<IUser> {
    return await this.storage.update(user);
  }

  @serviceLogger
  async getUserByID(id: userID): Promise<IUser> {
    return await this.storage.getByID(id);
  }

  @serviceLogger
  async getUsers(searchTerm: string, limit: number): Promise<Array<IUser>> {
    return await this.storage.getUsers(searchTerm, limit);
  }
}

export const userService = new UserService(userStorage);
