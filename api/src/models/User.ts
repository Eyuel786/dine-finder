import { Schema, Document, model } from "mongoose";
import { emailPattern, passwordPattern } from "../utils/regexPatterns";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => emailPattern.test(value),
        message: "Email is invalid",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
