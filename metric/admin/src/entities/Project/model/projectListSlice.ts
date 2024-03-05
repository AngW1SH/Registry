import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProject } from "..";
import { fetchAll } from "../api/fetchAll";

interface ProjectListState {
  projects: IProject[];
  isLoading: boolean;
  error: string;
}

const initialState: ProjectListState = {
  projects: [],
  isLoading: false,
  error: "",
};

export const fetchAllProjects = createAsyncThunk(
  "projectList/fetchAll",
  fetchAll
);

export const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.error = "";
      })
      .addCase(fetchAllProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.projects = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});
