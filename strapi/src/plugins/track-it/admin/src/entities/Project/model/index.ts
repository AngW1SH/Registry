import { create } from "zustand";
import { IProject, projectAdapter } from "../types";
import { getFetchClient } from "@strapi/helper-plugin";

interface ProjectState {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  filter: string;
  setFilter: (filter: string) => void;
  isLoading: boolean;
  fetchProjects: () => void;
  updateProject: (projectId: number) => void;
}

export const useProjectStore = create<ProjectState>()((set, get) => ({
  projects: [],
  setProjects: (projects: IProject[]) => set({ projects }),
  filter: "",
  setFilter: (filter: string) => set({ filter }),
  isLoading: false,
  fetchProjects: async () => {
    set({ isLoading: true });

    const { get } = getFetchClient();

    const response = await get("/track-it/project");

    if (response.status != 200) set({ projects: [], isLoading: false });

    set({
      projects: response.data.map((project: any) => projectAdapter(project)),
      isLoading: false,
    });
  },
  updateProject: async (projectId: number) => {
    const { put } = getFetchClient();

    const response = await put(`/track-it/project/${projectId}`);

    if (response.status != 200) return;

    const oldProjects = get().projects;

    set({
      projects: oldProjects.map((project) =>
        project.id === projectId
          ? { ...project, syncDate: new Date() }
          : project
      ),
    });
  },
}));
