import { Token } from "../models/Token.model";
import { IToken } from "../types/token.types";

export class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }
}

export const tokenRepository = new TokenRepository();
