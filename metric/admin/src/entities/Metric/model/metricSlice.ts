import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMetric } from "..";

interface MetricState {
  metrics: IMetric[];
  isLoading: boolean;
  error: string;
}

const initialState: MetricState = {
  metrics: [],
  isLoading: false,
  error: "",
};

export const metricSlice = createSlice({
  name: "metric",
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<IMetric[]>) => {
      state.metrics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});