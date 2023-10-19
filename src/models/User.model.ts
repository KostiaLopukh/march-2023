import { Model, model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { EUserStatus } from "../enums/user-status.enum";
import { IUser } from "../types/user.type";

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByEmail(email: string): Promise<IUser>;
}

interface IUserMethods {
  nameWithAge(): string;
}

interface IUserVirtuals {
  birthYear: number;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum age is 1"],
      max: [199, "Maximum age is 199"],
    },
    genders: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      enum: EUserStatus,
      required: true,
      default: EUserStatus.inactive,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods = {
  nameWithAge(): string {
    return `${this.name} is ${this.age} years old`;
  },
};

userSchema.statics = {
  async findByEmail(email): Promise<IUser> {
    return this.findOne({ email });
  },
};

userSchema.virtual("birthYear").get(function () {
  if (this.age) {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
  return null;
});

export const User = model<IUser, IUserModel>("user", userSchema);
