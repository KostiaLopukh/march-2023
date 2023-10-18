import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../configs/file.config";
import { ApiError } from "../errors/api.error";

class FilesMiddleware {
  public async isAvatarValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError(
          "Avatar is not allowed to be an array of images",
          400,
        );
      }

      const { size, mimetype } = req.files.avatar;

      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError("File is too big", 400);
      }

      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError("File has invalid format", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FilesMiddleware();
