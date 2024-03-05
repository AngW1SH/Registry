import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IResource } from "..";

interface ResourceState {
  resources: IResource[];
  isLoading: boolean;
  error: string;
}

const initialState: ResourceState = {
  resources: [],
  isLoading: false,
  error: "",
};

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setResources: (state, action: PayloadAction<IResource[]>) => {
      state.resources = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
