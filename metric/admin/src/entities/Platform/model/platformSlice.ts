import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPlatform } from "..";
import { fetchAll } from "../api/fetchAll";

export interface PlatformState {
  platforms: IPlatform[];
  isLoading: boolean;
  error: string;
}

const initialState: PlatformState = {
  platforms: [],
  isLoading: false,
  error: "",
};

export const fetchAllPlatforms = createAsyncThunk(
  "platform/fetchAll",
  fetchAll
);

export const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlatforms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.platforms = action.payload;
        state.error = "";
      })
      .addCase(fetchAllPlatforms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPlatforms.rejected, (state, action) => {
        state.isLoading = false;
        state.platforms = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});
