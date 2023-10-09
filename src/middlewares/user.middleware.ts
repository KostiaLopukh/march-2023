import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      req.res.locals = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isEmailUniq(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await userRepository.getOneByParams({ email });
      if (user) {
        throw new ApiError("Email already exist", 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).lean();

        if (!user) {
          throw new ApiError("User not found", 404);
        }

        req.res.locals = user;

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
