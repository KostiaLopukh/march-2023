import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "1h",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }

  public generateActionToken(payload: ITokenPayload): string {
    return jwt.sign(payload, configs.JWT_ACTION_SECRET, {
      expiresIn: "1d",
    });
  }

  public checkActionToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, configs.JWT_ACTION_SECRET) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenService = new TokenService();
