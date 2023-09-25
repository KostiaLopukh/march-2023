import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import * as fsService from "./fs.service";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();

    return res.json(users);
  },
);

// Endpoint for creating user
app.post("/users", async (req, res) => {
  try {
    const createdUser = await User.create({ ...req.body });
    res.status(201).json(createdUser);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await fsService.reader();
    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === Number(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    users.splice(index, 1);

    await fsService.writer(users);

    res.sendStatus(204);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || name.length < 2) {
      throw new Error("Wrong name");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Wrong email");
    }

    const users = await fsService.reader();
    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      throw new Error("User not found");
    }

    user.email = email;
    user.name = name;

    await fsService.writer(users);

    res.status(201).json(user);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

const PORT = 5001;

app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${PORT}`);
});

// CRUD c - create, r - read, u - update, d - delete
