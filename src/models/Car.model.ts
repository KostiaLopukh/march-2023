import { model, Schema, Types } from "mongoose";

import { EProducer } from "../enums/producer.enum";
import { ICar } from "../types/car.type";
import { User } from "./User.model";

const carSchema = new Schema(
  {
    year: {
      type: Number,
    },
    model: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      enum: EProducer,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
