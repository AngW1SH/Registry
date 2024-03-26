import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../api/fetchUser";
import { IUser } from "../types";

export interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: "",
};

export const fetchUserThunk = createAsyncThunk("user/fetch", fetchUser);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message || "Something went wrong";
      });
  },
});
