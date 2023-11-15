import { RequestHandler } from "express";
import { restaurantSchema } from "./schemas";
import AppError from "./AppError";
import Restaurant from "../models/Restaurant";

export const validateRestaurant: RequestHandler = (req, _, next) => {
  const { error } = restaurantSchema.validate(req.body.restaurant);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    return next(new AppError(errMsg, 400));
  }
  next();
};

export const restaurantExists: RequestHandler = async (req, res, next) => {
  const restaurantFound = await Restaurant.exists({ _id: req.params.id });
  if (!restaurantFound) return next(new AppError("Restaurant not found", 400));
  next();
};
