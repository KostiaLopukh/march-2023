import { model, Schema } from "mongoose";

import { EProducer } from "../enums/producer.enum";
import { ICar } from "../types/car.type";

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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
