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
    pushMetric: (state, action: PayloadAction<IMetric>) => {
      state.metrics.push(action.payload);
    },
    popMetric: (state, action: PayloadAction<string>) => {
      state.metrics = state.metrics.filter(
        (metric) => metric.id !== action.payload
      );
    },
    updateMetric: (state, action: PayloadAction<IMetric>) => {
      state.metrics = state.metrics.map((metric) => {
        if (metric.id === action.payload.id) {
          return action.payload;
        }
        return metric;
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
