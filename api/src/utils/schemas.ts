import Joi from "joi";
import Cuisine from "../types/Cuisine";
import { emailPattern, passwordPattern } from "./regexPatterns";

export const restaurantSchema = Joi.object({
  name: Joi.string().min(3).required(),
  cuisine: Joi.string()
    .valid(...Object.values(Cuisine))
    .required(),
  address: Joi.string().required(),
  image: Joi.string().uri().required(),
  description: Joi.string().min(50).required(),
  _id: Joi.string(),
  id: Joi.string(),
  __v: Joi.number(),
});

export const personSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

export const userSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
});
