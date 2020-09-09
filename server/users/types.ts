import { IUser } from "./models/interfaces";

export type userID = string;

export type UserCreation = Partial<IUser>;

export type requestData = Record<string, unknown>;

export type ValidationError = {
  path: string;
  message: string;
};
