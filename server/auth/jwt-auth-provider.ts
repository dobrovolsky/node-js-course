import { IAuthProvider } from "./inderfaces";
import { IUser } from "../users";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { requestHeaders } from "../shared/types";

export class JwtAuthProvider implements IAuthProvider {
  private readonly headerName: string;

  constructor(headerName = "authorization") {
    this.headerName = headerName;
  }

  getToken(headers: requestHeaders): string {
    const authHeader = headers["authorization"];
    return authHeader && authHeader.split(" ")[1];
  }

  async isValid(token: string): Promise<boolean> {
    try {
      jwt.verify(token, config.jtwSecretKey);
    } catch (e) {
      return false;
    }
    return true;
  }

  async sign(user: IUser): Promise<requestHeaders> {
    const token = jwt.sign(
      {
        id: user.id,
        login: user.login,
        age: user.age,
      },
      config.jtwSecretKey,
      { expiresIn: config.jwtTTL, algorithm: config.jwtAlgo }
    );

    return {
      [this.headerName]: token,
    };
  }
}
