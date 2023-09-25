import { config } from "dotenv";
config();

export const configs = {
  DB_URI: process.env.DB_URI,
};
