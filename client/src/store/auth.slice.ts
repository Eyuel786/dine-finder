import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../types/User";
import { sendSignInRequest, sendSignUpRequest } from "./auth.thunks";

interface AuthState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  user: User;
  error: string;
}

const initUser: User = {
  userId: "",
  username: "",
  email: "",
  token: "",
  tokenExpirationDate: "",
};

const initialState: AuthState = {
  status: "idle",
  user: initUser,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.status = "pending";
    },
    login: (state, action: PayloadAction<User>) => {
      state.status = "fulfilled";
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.status = "fulfilled";
      state.user = initUser;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendSignUpRequest.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(sendSignUpRequest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = { ...action.payload };
      })
      .addCase(sendSignUpRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(sendSignInRequest.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(sendSignInRequest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = { ...action.payload };
      })
      .addCase(sendSignInRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export const authActions = authSlice.actions;

export const signOut = () => {
  return (dispatch: any) => {
    localStorage.removeItem("dine-finder-user");
    dispatch(authActions.logout());
  };
};