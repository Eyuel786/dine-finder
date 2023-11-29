import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../types/User";
import { sendSignInRequest, sendSignUpRequest } from "./auth.thunks";
import { AppDispatch } from ".";

interface AuthState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  user: User;
  message: string;
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
  message: "",
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
      state.message = "You are signed out successfully";
    },
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendSignUpRequest.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(sendSignUpRequest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = { ...action.payload };
        state.message = "Your account is created successfully";
      })
      .addCase(sendSignUpRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      })
      .addCase(sendSignInRequest.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(sendSignInRequest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = { ...action.payload };
        state.message = "You are logged in successfully";
      })
      .addCase(sendSignInRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      });
  },
});

export const authActions = authSlice.actions;

export const signOut = () => {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("dine-finder-user");
    dispatch(authActions.logout());
  };
};
