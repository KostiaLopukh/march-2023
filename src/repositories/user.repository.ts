import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    const users = await User.find();
    return users;
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async createUser(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async register(dto: IUserCredentials): Promise<IUser> {
    return await User.create(dto);
  }

  public async updateUser(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteUser(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
