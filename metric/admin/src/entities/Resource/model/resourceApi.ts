import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResource } from "..";

export interface MetricParams {
  project: string;
  resource: string;
  name: string;
}

export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/" }),
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
  }),
});

export const { useSaveResourceMutation } = resourceApi;
