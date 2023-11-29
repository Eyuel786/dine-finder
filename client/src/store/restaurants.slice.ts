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
  message: string;
}

const initialState: RestaurantsState = {
  status: "idle",
  restaurants: [],
  message: "",
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants = [...action.payload];
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      })
      .addCase(sendNewRestaurant.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(sendNewRestaurant.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants.push({ ...action.payload });
        state.message = "Restaurant created successfully";
      })
      .addCase(sendNewRestaurant.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      })
      .addCase(sendUpdatedRestaurant.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(sendUpdatedRestaurant.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants = state.restaurants.map((r) =>
          r.id === action.payload.id ? { ...action.payload } : r
        );
        state.message = "Restaurant updated successfully";
      })
      .addCase(sendUpdatedRestaurant.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      })
      .addCase(removeRestaurantDB.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(removeRestaurantDB.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.restaurants = state.restaurants.filter(
          (r) => r.id !== action.payload
        );
        state.message = "Restaurant removed successfully";
      })
      .addCase(removeRestaurantDB.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      });
  },
});

export const restaurantsActions = restaurantsSlice.actions;
