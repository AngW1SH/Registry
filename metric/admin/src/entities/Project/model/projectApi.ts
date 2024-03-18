import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProject } from "..";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/" }),
  endpoints: (build) => ({
    updateProject: build.mutation<void, IProject>({
      query: (project) => ({
        url: `project/${project.id}`,
        method: "PUT",
        body: { project: project },
      }),
    }),
    deleteProject: build.mutation<void, string>({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUpdateProjectMutation, useDeleteProjectMutation } =
  projectApi;
