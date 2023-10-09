import { FilterQuery } from "mongoose";

import { EActionTokenType } from "../enums/actionTokenType.enum";
import { ActionToken } from "../models/ActionToken.model";
import { IActionToken } from "../types/token.types";

export class ActionTokenRepository {
  public async create(dto: IActionToken): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }

  public async findOne(
    params: FilterQuery<IActionToken>,
  ): Promise<IActionToken> {
    return await ActionToken.findOne(params);
  }

  public async deleteOne(params: FilterQuery<IActionToken>): Promise<void> {
    await ActionToken.deleteOne(params);
  }

  public async deleteManyByUserIdAndType(
    userId: string,
    type: EActionTokenType,
  ): Promise<void> {
    await ActionToken.deleteMany({ _userId: userId, type });
  }
}

export const actionTokenRepository = new ActionTokenRepository();
