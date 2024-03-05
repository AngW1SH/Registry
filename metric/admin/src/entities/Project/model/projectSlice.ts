import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "..";

interface ProjectState {
  project: IProject | null;
  isLoading: boolean;
  error: string;
}

const initialState: ProjectState = {
  project: null,
  isLoading: false,
  error: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<IProject>) => {
      state.project = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
