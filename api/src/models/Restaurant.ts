import { Document, Schema, model, Types } from "mongoose";
import Cuisine from "../types/Cuisine";

interface IRestaurant extends Document {
  name: string;
  cuisine: Cuisine;
  address: string;
  image: string;
  description: string;
  author: Types.ObjectId;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    cuisine: {
      type: String,
      required: true,
      enum: Object.values(Cuisine),
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          try {
            new URL(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: "Invalid image url",
      },
    },
    description: {
      type: String,
      required: true,
      minLength: 50,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IRestaurant>("Restaurant", restaurantSchema);
