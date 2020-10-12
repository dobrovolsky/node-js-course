import { IUser } from "../users";
import { requestHeaders } from "../shared/types";

export interface IAuthProvider {
  isValid(token: string): Promise<boolean>;
  getToken(headers: requestHeaders): string;
  sign(user: IUser): Promise<requestHeaders>;
}
