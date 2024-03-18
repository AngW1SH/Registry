import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/" }),
  endpoints: (build) => ({
    deleteProject: build.mutation<void, string>({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteProjectMutation } = projectApi;
