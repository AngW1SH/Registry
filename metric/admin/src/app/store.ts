import { metricSlice } from "@/entities/Metric";
import { platformSlice } from "@/entities/Platform";
import { projectSlice, projectListSlice } from "@/entities/Project";
import { resourceSlice } from "@/entities/Resource";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  platform: platformSlice.reducer,
  project: projectSlice.reducer,
  projectList: projectListSlice.reducer,
  resource: resourceSlice.reducer,
  metric: metricSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
