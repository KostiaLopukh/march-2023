import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators/user.validator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  },
);

// Endpoint for creating user
app.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await User.create(value);
      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },
);

app.get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }
      const user = await User.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }
      const { deletedCount } = await User.deleteOne({ _id: id });
      if (!deletedCount) {
        throw new ApiError("User not found", 404);
      }
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
);

app.put(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const user = await User.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json(error.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});

// CRUD c - create, r - read, u - update, d - delete
