import joi from "joi";

import { EProducer } from "../enums/producer.enum";

export class CarValidator {
  static year = joi.number().min(1990).max(2023);
  static model = joi.string().min(2).max(30).trim();
  static producer = joi.valid(...Object.values(EProducer));

  static create = joi.object({
    year: this.year.required(),
    model: this.model.required(),
    producer: this.producer.required(),
  });

  static update = joi.object({
    year: this.year,
    model: this.model,
  });
}
