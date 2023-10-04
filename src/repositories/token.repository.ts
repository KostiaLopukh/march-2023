import { FilterQuery } from "mongoose";

import { Token } from "../models/Token.model";
import { IToken } from "../types/token.types";

export class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findOne(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteOne(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
