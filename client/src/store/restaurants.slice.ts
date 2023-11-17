import { createSlice } from "@reduxjs/toolkit";
import Restaurant from "../types/Restaurant";
import {
  fetchAllRestaurants,
  removeRestaurantDB,
  sendNewRestaurant,
  sendUpdatedRestaurant,
} from "./restaurants.thunks";

interface RestaurantsState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  restaurants: Restaurant[];
  error: string;
}

const initialState: RestaurantsState = {
  status: "idle",
  restaurants: [],
  error: "",
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants = [...action.payload];
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(sendNewRestaurant.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(sendNewRestaurant.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants.push({ ...action.payload });
      })
      .addCase(sendNewRestaurant.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(sendUpdatedRestaurant.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(sendUpdatedRestaurant.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants = state.restaurants.map((r) =>
          r.id === action.payload.id ? { ...action.payload } : r
        );
      })
      .addCase(sendUpdatedRestaurant.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(removeRestaurantDB.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(removeRestaurantDB.fulfilled, (state, action) => {
        state.status = "rejected";
        state.restaurants = state.restaurants.filter(
          (r) => r.id !== action.payload
        );
      })
      .addCase(removeRestaurantDB.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export const restaurantsActions = restaurantsSlice.actions;
