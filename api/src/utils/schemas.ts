import Joi from "joi";
import Cuisine from "../types/Cuisine";

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
