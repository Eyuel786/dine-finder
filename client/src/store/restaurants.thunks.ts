import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Restaurant, { RestaurantData } from "../types/Restaurant";
import { RootState } from ".";

const baseURL = "http://127.0.0.1:3000/api/restaurants";

const api = axios.create({ baseURL });

export const fetchAllRestaurants = createAsyncThunk<Restaurant[], void>(
  "restaurants/fetchAllRestaurants",
  async () => {
    try {
      const { data } = await api.get<Restaurant[]>("/");
      return data;
    } catch (error) {
      throw new Error("Failed to fetch restaurants");
    }
  }
);

export const sendNewRestaurant = createAsyncThunk<Restaurant, RestaurantData>(
  "restaurants/sendNewRestaurant",
  async (restaurantData, { getState }) => {
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
      throw new Error("Failed to create restaurant");
    }
  }
);

export const sendUpdatedRestaurant = createAsyncThunk<
  Restaurant,
  { id: string; restaurant: Restaurant }
>(
  "restaurants/sendUpdatedRestaurant",
  async ({ id, restaurant }, { getState }) => {
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
      throw new Error("Failed to update restaurant");
    }
  }
);

export const removeRestaurantDB = createAsyncThunk<string, string>(
  "restaurants/removeRestaurant",
  async (id, { getState }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user;
      await api.delete(`/${id}`, {
        headers: { Authorization: "bearer " + token },
      });
      return id;
    } catch (error) {
      throw new Error("Failed to remove restaurant");
    }
  }
);
