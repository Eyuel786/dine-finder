import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Restaurant from "../types/Restaurant";

const baseURL = "http://127.0.0.1:3000/api/restaurants";

const api = axios.create({ baseURL });

export const fetchAllRestaurants = createAsyncThunk<
  Restaurant[],
  void,
  { rejectValue: string }
>("restaurants/fetchAllRestaurants", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/");
    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch restaurants");
  }
});

export const sendNewRestaurant = createAsyncThunk<
  Restaurant,
  Omit<Restaurant, "id">,
  { rejectValue: string }
>(
  "restaurants/sendNewRestaurant",
  async (restaurantData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/", { restaurant: restaurantData });
      return data;
    } catch (error) {
      return rejectWithValue("Failed to send new restaurant");
    }
  }
);

export const sendUpdatedRestaurant = createAsyncThunk<
  Restaurant,
  { id: string; restaurant: Restaurant },
  { rejectValue: string }
>(
  "restaurants/sendUpdatedRestaurant",
  async ({ id, restaurant }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/${id}`, { restaurant });
      return data;
    } catch (error) {
      return rejectWithValue("Failed to send updated restaurant");
    }
  }
);

export const removeRestaurantDB = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("restaurants/removeRestaurant", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue("Failed to remove restaurant from DB");
  }
});
