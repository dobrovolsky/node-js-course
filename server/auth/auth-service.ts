import { IAuthProvider } from "./inderfaces";
import { requestHeaders } from "../shared/types";
import { IUser } from "../users";
import { JwtAuthProvider } from "./jwt-auth-provider";

class AuthService {
  private readonly provider: IAuthProvider;

  constructor(provider: IAuthProvider) {
    this.provider = provider;
  }

  async sign(user: IUser): Promise<requestHeaders> {
    return this.provider.sign(user);
  }
  async isValid(token: string): Promise<boolean> {
    return this.provider.isValid(token);
  }

  getToken(headers: requestHeaders): string {
    return this.provider.getToken(headers);
  }
}

const authProvider = new JwtAuthProvider();
export const authService = new AuthService(authProvider);
