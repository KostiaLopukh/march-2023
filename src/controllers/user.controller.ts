import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";
import { IQuery } from "../types/pagination.type";
import { ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAllWithPagination(req.query as IQuery);

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await userService.deleteUser(req.params.userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const user = await userService.updateUser(
        req.params.userId,
        req.body,
        userId,
      );

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.res.locals;

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;
      const user = await userService.getMe(userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const avatar = req.files.avatar as UploadedFile;
      const user = await userService.uploadAvatar(avatar, userId);

      const response = userPresenter.present(user);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
