import { model, Schema, Types } from "mongoose";

import { IToken } from "../types/token.types";
import { User } from "./User.model";

const tokensSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Token = model<IToken>("token", tokensSchema);
