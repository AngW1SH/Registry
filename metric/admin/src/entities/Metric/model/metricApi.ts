import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMetric } from "..";

export interface MetricParams {
  project: string;
  resource: string;
  name: string;
}

export const metricApi = createApi({
  reducerPath: "metricApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/" }),
  endpoints: (build) => ({
    getMetricNames: build.query<string[], void>({
      query: () => "metric",
    }),
    createMetric: build.mutation<IMetric, MetricParams>({
      query: (metricParams) => ({
        url: "metric",
        method: "POST",
        body: metricParams,
      }),
    }),
    deleteMetric: build.mutation<void, string>({
      query: (id) => ({
        url: `metric/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMetricNamesQuery,
  useCreateMetricMutation,
  useDeleteMetricMutation,
} = metricApi;
