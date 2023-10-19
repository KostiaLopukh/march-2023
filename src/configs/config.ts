import { config } from "dotenv";

config();

export const configs = {
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/march-2023",
  PORT: process.env.PORT || 5001,
  FRONT_URL: process.env.FRONT_URL || "http://0.0.0.0:3000",
  SECRET_SALT: process.env.SECRET_SALT,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
  JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_URL: process.env.AWS_S3_URL,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
};
