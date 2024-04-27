import { create } from "zustand";
import { IProject } from "../types";
import { getFetchClient } from "@strapi/helper-plugin";

interface ProjectState {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  isLoading: boolean;
  fetchProjects: () => void;
}

export const useProjectStore = create<ProjectState>()((set, get) => ({
  projects: [],
  setProjects: (projects: IProject[]) => set({ projects }),
  isLoading: false,
  fetchProjects: async () => {
    set({ isLoading: true });

    const { get } = getFetchClient();

    const response = await get("/track-it/project");

    console.log(response);

    if (response.status != 200) set({ projects: [], isLoading: false });

    set({ projects: response.data, isLoading: false });
  },
}));
