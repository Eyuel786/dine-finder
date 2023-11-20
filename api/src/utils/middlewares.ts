import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { personSchema, restaurantSchema, userSchema } from "./schemas";
import AppError from "./AppError";
import Restaurant from "../models/Restaurant";
import wrapAsync from "./wrapAsync";
import User from "../models/User";

export const validateRestaurant: RequestHandler = (req, _, next) => {
  const { error } = restaurantSchema.validate(req.body.restaurant);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    return next(new AppError(errMsg, 400));
  }
  next();
};

export const restaurantExists: RequestHandler = wrapAsync(
  async (req, _, next) => {
    const restaurantFound = await Restaurant.exists({ _id: req.params.id });
    if (!restaurantFound)
      return next(new AppError("Restaurant not found", 400));
    next();
  }
);

export const validatePerson: RequestHandler = (req, _, next) => {
  const { error } = personSchema.validate(req.body.person);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    return next(new AppError(errMsg, 400));
  }
  next();
};

export const validateUser: RequestHandler = (req, _, next) => {
  const { error } = userSchema.validate(req.body.user);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    return next(new AppError(errMsg, 400));
  }
  next();
};

export const isUsernameAndEmailUnique = wrapAsync(async (req, res, next) => {
  const { email, username } = req.body.person;
  let userExists = await User.exists({ email });
  if (userExists) {
    return next(new AppError("User by that email already exists", 400));
  }

  userExists = await User.exists({ username });
  if (userExists) {
    return next(new AppError("User by that username already exists", 400));
  }

  next();
});

export const signInUser = wrapAsync(async (req, _, next) => {
  const { email, password } = req.body.user;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return next(new AppError("Invalid credentials", 400));
  }

  next();
});
