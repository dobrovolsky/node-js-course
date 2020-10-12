import { UserCreation } from "../types";
import { userID } from "../types";
import { IUser } from "..";

export interface IUserStorage {
  getByID(userID: userID): Promise<IUser>;
  getByLoginPassword(login: string, password: string): Promise<IUser>;
  create(userEntity: UserCreation): Promise<IUser>;
  update(userEntity: UserCreation): Promise<IUser>;
  getUsers(searchTerm: string, limit: number): Promise<Array<IUser>>;
}
