import { configs } from "../configs/config";
import { IUser } from "../types/user.type";

interface IPresenter<I, O> {
  present(payload: I): O;
}

class UserPresenter implements IPresenter<IUser, Partial<IUser>> {
  present(data: IUser): Partial<IUser> {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      genders: data.genders,
      email: data.email,
      status: data.status,
      avatar: `${configs.AWS_S3_URL}/${data.avatar}`,
    };
  }
}

export const userPresenter = new UserPresenter();
