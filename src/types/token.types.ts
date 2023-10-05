import { Document, Types } from "mongoose";

import { IUser } from "./user.type";

export interface ITokenPayload {
  userId: string;
  name: string;
}

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  _userId: Types.ObjectId | IUser;
}
