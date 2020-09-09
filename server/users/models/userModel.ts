import { userID } from "../types";
import { IUser } from "./interfaces";

class User implements IUser {
  id: userID;
  login: string;
  password: string;
  isDeleted: boolean;
  age: number;

  constructor(
    id: userID,
    login: string,
    password: string,
    age: number,
    isDeleted = false
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
}

export default User;
