import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMetric } from "..";
import { IGenericMetric } from "../types";
import { convertMetric } from "../utils/convertMetric";

interface MetricState {
  metrics: IMetric[];
  calendar: {
    start: Date | null;
    end: Date | null;
  };
  filters: {
    search: string;
  };
  isLoading: boolean;
  error: string;
}

const initialState: MetricState = {
  metrics: [],
  calendar: {
    start: null,
    end: null,
  },
  filters: {
    search: "",
  },
  isLoading: false,
  error: "",
};

export const metricSlice = createSlice({
  name: "metric",
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<IGenericMetric[]>) => {
      state.metrics = action.payload.map((metric) => convertMetric(metric));
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
    setCalendar(
      state,
      action: PayloadAction<{ start: Date | null; end: Date | null }>
    ) {
      state.calendar = action.payload;
    },
    setFilters(state, action: PayloadAction<{ search: string }>) {
      state.filters = action.payload;
    },
  },
});
