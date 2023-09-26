import { config } from "dotenv";

config();

export const configs = {
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/march-2023",
  PORT: process.env.PORT || 5001,
};
