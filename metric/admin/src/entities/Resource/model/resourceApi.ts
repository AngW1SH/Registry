import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResource } from "..";

export interface MetricParams {
  project: string;
  resource: string;
  name: string;
}

export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (build) => ({
    saveResource: build.mutation<void, IResource>({
      query: (resource) => ({
        url: `resource/${resource.id}`,
        method: "PUT",
        body: {
          resource: resource,
        },
      }),
    }),
    deleteResource: build.mutation<void, string>({
      query: (id) => ({
        url: `resource/${id}`,
        method: "DELETE",
      }),
    }),
    startTracking: build.mutation<void, string>({
      query: (id) => ({
        url: `resource/${id}/start`,
        method: "GET",
      }),
    }),
    stopTracking: build.mutation<void, string>({
      query: (id) => ({
        url: `resource/${id}/stop`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSaveResourceMutation,
  useDeleteResourceMutation,
  useStartTrackingMutation,
  useStopTrackingMutation,
} = resourceApi;
