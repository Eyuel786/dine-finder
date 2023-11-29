import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../types/User";
import axios from "axios";

export const sendSignUpRequest = createAsyncThunk<
  User,
  { username: string; email: string; password: string }
>("auth/sendSignUpRequest", async (userData) => {
  try {
    const { data } = await axios.post<User>(
      "http://127.0.0.1:3000/api/register",
      {
        person: userData,
      }
    );
    localStorage.setItem("dine-finder-user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error("Failed to create your account");
  }
});

export const sendSignInRequest = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/sendSignInRequest", async (userData) => {
  try {
    const { data } = await axios.post<User>("http://127.0.0.1:3000/api/login", {
      user: userData,
    });
    localStorage.setItem("dine-finder-user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
});
