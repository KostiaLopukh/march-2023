import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async updateUser(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.updateUser(userId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }
}

export const userService = new UserService();
