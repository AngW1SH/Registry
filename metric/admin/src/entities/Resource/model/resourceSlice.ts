import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IResource } from "..";
import { IResourceWithUsers } from "../types";

interface ResourceState {
  resources: IResourceWithUsers[];
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
      state.resources = action.payload.map((resource) => ({
        ...resource,
        users:
          state.resources.find((res) => res.id === resource.id)?.users || {},
      }));
    },
    addResource: (state, action: PayloadAction<IResource>) => {
      state.resources.push({
        ...action.payload,
        users:
          state.resources.find((resource) => resource.id === action.payload.id)
            ?.users || {},
      });
    },
    popResource: (state, action: PayloadAction<string>) => {
      state.resources = state.resources.filter(
        (resource) => resource.id != action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addUser: (
      state,
      action: PayloadAction<{ resourceId: string; username: string }>
    ) => {
      const { resourceId, username } = action.payload;

      state.resources = state.resources.map((resource) => {
        if (resource.id == resourceId) {
          return {
            ...resource,
            users: {
              ...resource.users,
              [username]: true,
            },
          };
        }

        return resource;
      });
    },
    setActiveUsers: (
      state,
      action: PayloadAction<{ resourceId: string; users: string[] }>
    ) => {
      const { resourceId, users } = action.payload;

      const oldUsers =
        state.resources.find((resource) => resource.id === resourceId)?.users ||
        {};

      Object.keys(oldUsers).forEach((key) => {
        oldUsers[key] = false;
      });

      users.forEach((user) => {
        oldUsers[user] = true;
      });

      state.resources = state.resources.map((resource) => {
        if (resource.id == resourceId) {
          return {
            ...resource,
            users: oldUsers,
          };
        }

        return resource;
      });
    },
  },
});
