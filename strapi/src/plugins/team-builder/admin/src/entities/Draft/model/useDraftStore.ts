import { create } from "zustand";
import { IDraft } from "..";
import { useDraftTeamsStore } from "../../Team/model";
import { getFetchClient } from "@strapi/helper-plugin";

interface DraftState {
  active: IDraft | null;
  setActive: (newActive: IDraft | null) => void;
  fetchActive: (id: number) => void;
}

export const useDraftStore = create<DraftState>()((set) => ({
  active: null,
  setActive: (newActive: IDraft | null) =>
    set((state) => {
      return {
        active: newActive,
      };
    }),
  fetchActive: async (id: number) => {
    const { get } = getFetchClient();

    const response = await get("/team-builder/draft/" + id);

    if (response.status != 200) set({ active: null });

    set({
      active: {
        ...response.data,
        form: response.data?.form?.id || null,
        activeStudents: response.data?.activeStudents
          ? response.data.activeStudents.map((student: any) => student.id)
          : null,
      },
    });
  },
}));
