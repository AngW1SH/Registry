import { create } from "zustand";
import { IProject, projectAdapter } from "../types";
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

    if (response.status != 200) set({ projects: [], isLoading: false });

    set({
      projects: response.data.map((project) => projectAdapter(project)),
      isLoading: false,
    });
  },
}));
