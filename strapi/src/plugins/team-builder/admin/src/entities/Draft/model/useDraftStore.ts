import { create } from "zustand";
import { IDraft } from "..";
import { useDraftTeamsStore } from "../../Team/model";
import { getFetchClient } from "@strapi/helper-plugin";

interface DraftState {
  draft: IDraft | null;
  setDraft: (newActive: IDraft | null) => void;
}

export const useDraftStore = create<DraftState>()((set) => ({
  draft: null,
  setDraft: (newActive: IDraft | null) =>
    set((state) => {
      return {
        draft: newActive,
      };
    }),
}));
