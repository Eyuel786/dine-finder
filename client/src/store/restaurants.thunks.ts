import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Restaurant, { RestaurantData } from "../types/Restaurant";
import { RootState } from ".";

const baseURL = "http://127.0.0.1:3000/api/restaurants";

const api = axios.create({ baseURL });

export const fetchAllRestaurants = createAsyncThunk<
  Restaurant[],
  void,
  { rejectValue: string }
>("restaurants/fetchAllRestaurants", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Restaurant[]>("/");
    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch restaurants");
  }
});

export const sendNewRestaurant = createAsyncThunk<
  Restaurant,
  RestaurantData,
  { rejectValue: string }
>(
  "restaurants/sendNewRestaurant",
  async (restaurantData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user;
      const { data } = await api.post<Restaurant>(
        "/",
        { restaurant: restaurantData },
        { headers: { Authorization: "bearer " + token } }
      );
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
  async ({ id, restaurant }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user;
      const { data } = await api.put<Restaurant>(
        `/${id}`,
        { restaurant },
        { headers: { Authorization: "bearer " + token } }
      );
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
>("restaurants/removeRestaurant", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const { token } = state.auth.user;
    await api.delete(`/${id}`, {
      headers: { Authorization: "bearer " + token },
    });
    return id;
  } catch (error) {
    return rejectWithValue("Failed to remove restaurant from DB");
  }
});
