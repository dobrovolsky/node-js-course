export type userID = string;

export interface IUser {
  id: userID;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type UserCreation = Partial<IUser>;

export type requestData = Record<string, unknown>;

export type ValidationError = {
  path: string;
  message: string;
};
