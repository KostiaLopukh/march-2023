import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = +limit * (+page - 1);

      const [users, itemsFound] = await Promise.all([
        User.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
        User.count(searchObject),
      ]);

      const user = await User.findOne({
        email: "julianne.oconner@kory.org",
      });

      // const userNameWithAge = user.nameWithAge(); // name + age

      // const user = await User.findByEmail("julianne.oconner@kory.org");
      // console.log(user);

      return {
        page: +page,
        limit: +limit,
        itemsFound: itemsFound,
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

  private checkAbilityToManage(userId: string, manageUserId: string): void {
    if (userId !== manageUserId) {
      throw new ApiError("U can not manage this user", 403);
    }
  }
}

export const userService = new UserService();
