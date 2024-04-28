import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMember } from "../types";

interface MemberState {
  members: IMember[];
  isLoading: boolean;
  error: string;
}

const initialState: MemberState = {
  members: [],
  isLoading: false,
  error: "",
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<IMember[]>) => {
      console.log(action.payload);
      state.members = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
