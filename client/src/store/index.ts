import { configureStore } from "@reduxjs/toolkit";
import { restaurantsSlice } from "./restaurants.slice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSlice } from "./auth.slice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsSlice.reducer,
    auth: authSlice.reducer,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
