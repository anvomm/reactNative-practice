import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authOperations";

const initialState = {
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
      builder
        .addMatcher(isAnyOf(registerUser.pending, loginUser.pending), (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addMatcher(
          isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
          (state) => {
            state.isLoading = false;
            state.error = null;
          }
        )
        .addMatcher(
          isAnyOf(registerUser.rejected, loginUser.rejected),
          (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
          }
        );
    },
  });
  

export const authReducer = authSlice.reducer;
