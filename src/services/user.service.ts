import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { IUser } from "../types/user.type";
import { EFileTypes, s3Service } from "./s3.service";

class UserService {
  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const [users, itemsFound] = await userRepository.getMany(query);

      // const user = await User.findOne({
      //   email: "julianne.oconner@kory.org",
      // });

      // const userNameWithAge = user.nameWithAge(); // name + age

      // const user = await User.findByEmail("julianne.oconner@kory.org");
      // console.log(user);

      return {
        page: +query.page,
        limit: +query.limit,
        itemsFound,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateUser(
    manageUserId: string,
    dto: Partial<IUser>,
    userId: string,
  ): Promise<IUser> {
    this.checkAbilityToManage(userId, manageUserId);
    return await userRepository.updateOneById(manageUserId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  public async uploadAvatar(
    avatar: UploadedFile,
    userId: string,
  ): Promise<IUser> {
    const user = await userRepository.findById(userId);

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    const filePath = await s3Service.uploadFile(
      avatar,
      EFileTypes.User,
      userId,
    );

    const updatedUser = await userRepository.updateOneById(userId, {
      avatar: filePath,
    });

    return updatedUser;
  }

  private checkAbilityToManage(userId: string, manageUserId: string): void {
    if (userId !== manageUserId) {
      throw new ApiError("U can not manage this user", 403);
    }
  }
}

export const userService = new UserService();
