import { memberSlice } from "@/entities/Member";
import { metricSlice } from "@/entities/Metric";
import { metricApi } from "@/entities/Metric/model/metricApi";
import { platformSlice } from "@/entities/Platform";
import { projectSlice, projectListSlice } from "@/entities/Project";
import { projectApi } from "@/entities/Project/model/projectApi";
import { resourceSlice } from "@/entities/Resource";
import { resourceApi } from "@/entities/Resource/model/resourceApi";
import { userApi } from "@/entities/User/model/userApi";
import { userSlice } from "@/entities/User/model/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  platform: platformSlice.reducer,
  project: projectSlice.reducer,
  projectApi: projectApi.reducer,
  projectList: projectListSlice.reducer,
  resource: resourceSlice.reducer,
  resourceApi: resourceApi.reducer,
  metric: metricSlice.reducer,
  member: memberSlice.reducer,
  metricApi: metricApi.reducer,
  user: userSlice.reducer,
  userApi: userApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        metricApi.middleware,
        resourceApi.middleware,
        projectApi.middleware,
        userApi.middleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
