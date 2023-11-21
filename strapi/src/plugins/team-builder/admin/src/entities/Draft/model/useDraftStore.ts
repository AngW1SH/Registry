import { create } from "zustand";
import { IDraft } from "..";
import { useFetchClient } from "@strapi/helper-plugin";
import { useDraftTeamsStore } from "../../Team/model";

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
  fetchActive: (id: number) => {},
}));
