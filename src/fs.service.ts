import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./types/user.type";

const dbPath = path.join(process.cwd(), "db.json");

const reader = async (): Promise<IUser[]> => {
  const json = await fs.readFile(dbPath, { encoding: "utf-8" });
  return JSON.parse(json);
};

const writer = async (users: IUser[]) => {
  await fs.writeFile(dbPath, JSON.stringify(users));
};

export { reader, writer };
