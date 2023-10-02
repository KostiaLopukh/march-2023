import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGenders } from "../enums/gender.enum";

export class UserValidator {
  static firstName = joi.string().min(2).max(50).trim();
  static age = joi.number().min(18).max(150);
  static genders = joi.valid(...Object.values(EGenders));
  static email = joi.string().regex(regexConstant.EMAIL).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();

  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    genders: this.genders.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genders,
  });

  static register = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
