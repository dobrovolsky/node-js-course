import { userID, IUser, UserCreation } from "./types";

interface IUserStorage {
  getByID(userID: userID): IUser;
  create(userEntity: UserCreation): IUser;
  update(userEntity: UserCreation): IUser;
  getUsers(searchTerm: string, limit: number): Array<IUser>;
}

export default IUserStorage;
