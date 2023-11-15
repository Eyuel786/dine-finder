import express, { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";
import Restaurant from "./models/Restaurant";
import wrapAsync from "./utils/wrapAsync";
import { restaurantExists, validateRestaurant } from "./utils/middlewares";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/dine-advisor-db")
  .catch(console.error.bind(console, "Initial DB error:"));

mongoose.connection.once("open", console.log.bind(console, "DB connected"));
mongoose.connection.on("error", console.error.bind(console, "DB error:"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getRestaurants: RequestHandler = wrapAsync(async (_, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants.map((r) => r.toObject({ getters: true })));
});

const getRestaurant: RequestHandler = wrapAsync(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant!.toObject({ getters: true }));
});

const insertRestaurant: RequestHandler = wrapAsync(async (req, res) => {
  const restaurant = await Restaurant.create(req.body.restaurant);
  res.json(restaurant.toObject({ getters: true }));
});

const updateRestaurant: RequestHandler = wrapAsync(async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body.restaurant,
    { new: true, runValidators: true }
  );

  res.json(restaurant!.toObject({ getters: true }));
});

const removeRestaurant: RequestHandler = wrapAsync(async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Restaurant removed" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { message = "Something went wrong!", statuCode = 500 } = err;
  res.status(statuCode).json({ message });
};

app.get("/api/restaurants", getRestaurants);
app.post("/api/restaurants", validateRestaurant, insertRestaurant);
app.get("/api/restaurants/:id", restaurantExists, getRestaurant);
app.put(
  "/api/restaurants/:id",
  restaurantExists,
  validateRestaurant,
  updateRestaurant
);
app.delete("/api/restaurants/:id", restaurantExists, removeRestaurant);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
