import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { EUserStatus } from "../enums/user-status.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  genders?: EGenders;
  email: string;
  phone: string;
  password: string;
  status: EUserStatus;
  avatar: string;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;
export interface ISetNewPassword extends Pick<IUser, "password"> {
  newPassword: string;
}
