import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import Restaurant from "../types/Restaurant";

const restaurants = [
  {
    id: uuid(),
    name: "5 Star Chinese",
    address: "43 Hamilton Street",
    cuisine: "Chinese",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus. Netus et malesuada fames ac turpis egestas maecenas. Purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. In cursus turpis massa tincidunt dui ut ornare lectus. Id semper risus in hendrerit gravida rutrum. Risus commodo viverra maecenas accumsan. Fermentum odio eu feugiat pretium nibh ipsum. Enim sed faucibus turpis in eu. Duis convallis convallis tellus id interdum. Dolor magna eget est lorem ipsum dolor sit amet. Eu mi bibendum neque egestas congue quisque egestas. Condimentum id venenatis a condimentum vitae sapien pellentesque.",
  },
  {
    id: uuid(),
    name: "Blue Plates",
    address: "43 Hamilton Street",
    cuisine: "Chinese",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus. Netus et malesuada fames ac turpis egestas maecenas. Purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. In cursus turpis massa tincidunt dui ut ornare lectus. Id semper risus in hendrerit gravida rutrum. Risus commodo viverra maecenas accumsan. Fermentum odio eu feugiat pretium nibh ipsum. Enim sed faucibus turpis in eu. Duis convallis convallis tellus id interdum. Dolor magna eget est lorem ipsum dolor sit amet. Eu mi bibendum neque egestas congue quisque egestas. Condimentum id venenatis a condimentum vitae sapien pellentesque.",
  },
];

interface RestaurantsState {
  status: "idle" | "pending" | "resolved" | "rejected";
  restaurants: Restaurant[];
  error: string;
}

const initialState: RestaurantsState = {
  status: "idle",
  restaurants,
  error: "",
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.status = "pending";
      state.error = "";
    },
    replace: (state, action: PayloadAction<{ restaurants: Restaurant[] }>) => {
      state.status = "resolved";
      state.restaurants = [...action.payload.restaurants];
    },
    add: (
      state,
      action: PayloadAction<{ restaurant: Omit<Restaurant, "id"> }>
    ) => {
      state.status = "resolved";
      state.restaurants.push({ ...action.payload.restaurant, id: uuid() });
    },
    update: (
      state,
      action: PayloadAction<{ id: string; restaurant: Restaurant }>
    ) => {
      state.status = "resolved";
      state.restaurants = state.restaurants.map((r) =>
        r.id === action.payload.id ? { ...action.payload.restaurant } : r
      );
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      state.status = "resolved";
      state.restaurants = state.restaurants.filter(
        (r) => r.id !== action.payload.id
      );
    },
    hasError: (state, action: PayloadAction<{ error: string }>) => {
      state.status = "rejected";
      state.error = action.payload.error;
    },
  },
});

export const restaurantsActions = restaurantsSlice.actions;
