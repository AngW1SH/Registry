import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MetricParams } from "../types";

export const metricNamesApi = createApi({
  reducerPath: "metricNamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/" }),
  endpoints: (build) => ({
    getMetricNames: build.query<string[], void>({
      query: () => "metric",
    }),
    createMetric: build.mutation<void, MetricParams>({
      query: (metricParams) => ({
        url: "metric",
        method: "POST",
        body: metricParams,
      }),
    }),
  }),
});

export const { useGetMetricNamesQuery, useCreateMetricMutation } =
  metricNamesApi;
