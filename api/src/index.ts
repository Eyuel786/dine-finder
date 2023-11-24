if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import express, { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Restaurant from "./models/Restaurant";
import wrapAsync from "./utils/wrapAsync";
import {
  isAuthenticated,
  isRestaurantAuthor,
  isUsernameAndEmailUnique,
  restaurantExists,
  signInUser,
  validatePerson,
  validateRestaurant,
  validateUser,
} from "./utils/middlewares";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User";

mongoose
  .connect("mongodb://127.0.0.1:27017/dine-advisor-db")
  .catch(console.error.bind(console, "Initial DB error:"));

mongoose.connection.once("open", console.log.bind(console, "DB connected"));
mongoose.connection.on("error", console.error.bind(console, "DB error:"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/api/restaurants",
  wrapAsync(async (_, res) => {
    const restaurants = await Restaurant.find({});
    res.json(restaurants.map((r) => r.toObject({ getters: true })));
  })
);

app.post(
  "/api/restaurants",
  isAuthenticated,
  validateRestaurant,
  wrapAsync(async (req, res) => {
    const restaurant = new Restaurant(req.body.restaurant);
    restaurant.author = req.user!.userId;
    await restaurant.save();
    res.json(restaurant.toObject({ getters: true }));
  })
);

app.get(
  "/api/restaurants/:id",
  restaurantExists,
  wrapAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant!.toObject({ getters: true }));
  })
);

app.put(
  "/api/restaurants/:id",
  isAuthenticated,
  isRestaurantAuthor,
  restaurantExists,
  validateRestaurant,
  wrapAsync(async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body.restaurant,
      { new: true, runValidators: true }
    );

    res.json(restaurant!.toObject({ getters: true }));
  })
);
app.delete(
  "/api/restaurants/:id",
  isAuthenticated,
  isRestaurantAuthor,
  restaurantExists,
  wrapAsync(async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant removed" });
  })
);

// USER
app.post(
  "/api/register",
  validatePerson,
  isUsernameAndEmailUnique,
  wrapAsync(async (req, res) => {
    const { email, username, password } = req.body.person;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      userId: user.id,
      email: user.email,
      username: user.username,
      token,
      tokenExpirationDate: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ),
    });
  })
);

app.post(
  "/api/login",
  validateUser,
  signInUser,
  wrapAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.user.email });

    const token = jwt.sign(
      { userId: user!.id, email: user!.email, username: user!.username },
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "7d" }
    );

    res.json({
      userId: user!.id,
      email: user!.email,
      username: user!.username,
      token,
      tokenExpirationDate: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ),
    });
  })
);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { message = "Something went wrong!", statuCode = 500 } = err;
  res.status(statuCode).json({ message });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
