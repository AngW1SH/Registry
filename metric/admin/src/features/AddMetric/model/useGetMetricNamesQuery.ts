import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const metricNamesApi = createApi({
  reducerPath: "metricNamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/" }),
  endpoints: (build) => ({
    getMetricNames: build.query<string[], void>({
      query: () => "metric",
    }),
  }),
});

export const { useGetMetricNamesQuery } = metricNamesApi;
