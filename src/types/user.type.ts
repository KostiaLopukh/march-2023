import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  genders?: EGenders;
  email: string;
  password: string;
}
