import { userID } from "../types";

export interface IUser {
  id: userID;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
