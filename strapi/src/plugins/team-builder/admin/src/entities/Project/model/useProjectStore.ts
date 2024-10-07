import { getFetchClient } from "@strapi/helper-plugin";
import { IProject } from "../types";
import { create } from "zustand";

interface ProjectState {
  projects: IProject[];
  selectedProjectIds: number[];
  setProjects: (newProjects: IProject[]) => void;
  getSelectedProjects: () => IProject[];
  setSelectedProjects: (students: string[] | number[]) => void;
  setProjectById: (id: number) => void;
  fetch: () => void;
}

export const useProjectStore = create<ProjectState>()((set, get) => ({
  projects: [],
  selectedProjectIds: [],
  setProjects: (newProjects: IProject[]) => set({ projects: newProjects }),
  setSelectedProjects: (projects: string[] | number[]) => {
    if (!projects.length) return set((state) => ({ selectedProjectIds: [] }));

    if (typeof projects[0] == "number")
      return set((state) => ({ selectedProjectIds: projects as number[] }));

    set((state) => ({
      selectedProjectIds: projects
        .map((name) => state.projects.find((p) => p.name == name)?.id!)
        .filter((student) => student),
    }));
  },
  getSelectedProjects: () =>
    get().projects.filter((project: IProject) =>
      get().selectedProjectIds.includes(project.id)
    ),
  setProjectById: (id: number) =>
    set((state) => ({ selectedProjectIds: [...state.selectedProjectIds, id] })),
  fetch: async () => {
    const { get } = getFetchClient();

    const response = await get("/team-builder/project/");

    if (response.status != 200) set({ projects: [] });

    set({
      projects: response.data || [],
    });
  },
}));
