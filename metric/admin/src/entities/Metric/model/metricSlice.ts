import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMetric } from "..";
import { IGenericMetric } from "../types";
import { IMetricParam } from "../types/params";
import { IMetricGrade } from "../types/grades";
import { convertMetric } from "../config/instances/convertMetric";

interface MetricState {
  metrics: IMetric[];
  grades: IMetricGrade[];
  calendar: {
    start: string | null;
    end: string | null;
  };
  filters: {
    search: string;
  };
  isLoading: boolean;
  error: string;
}

const initialState: MetricState = {
  metrics: [],
  grades: [],
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
    updateParams: (
      state,
      action: PayloadAction<{ metricId: string; params: IMetricParam[] }>
    ) => {
      state.metrics = state.metrics.map((metric) => {
        if (metric.id === action.payload.metricId) {
          return { ...metric, params: action.payload.params };
        }
        return metric;
      });
    },
    updateGrade: (state, action: PayloadAction<IMetricGrade>) => {
      let found = false;
      state.grades = state.grades.map((data) => {
        if (data.metricId === action.payload.metricId) {
          found = true;
          return { ...data, grade: action.payload.grade };
        }
        return data;
      });

      if (!found) {
        state.grades.push(action.payload);
      }
    },
    updateStatus: (
      state,
      action: PayloadAction<{ metricId: string; isTracked: boolean }>
    ) => {
      state.metrics = state.metrics.map((metric) => {
        if (metric.id === action.payload.metricId) {
          return { ...metric, isTracked: action.payload.isTracked };
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
      action: PayloadAction<{ start: string | null; end: string | null }>
    ) {
      state.calendar = action.payload;
    },
    setFilters(state, action: PayloadAction<{ search: string }>) {
      state.filters = action.payload;
    },
  },
});
