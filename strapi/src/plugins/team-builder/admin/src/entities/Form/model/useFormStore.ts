import { create } from "zustand";
import { IForm } from "../types";
import { staticFormList } from "../static";
import { useStudentStore } from "../../Student";
import { getFetchClient } from "@strapi/helper-plugin";

interface FormState {
  form: IForm | null;
  options: IForm[];
  setForm: (formName: string) => void;
  fetch: () => void;
}

export const useFormStore = create<FormState>()((set) => ({
  form: null,
  options: staticFormList,
  setForm: (formName: string) =>
    set((state) => {
      const form = state.options.find((form) => form.name == formName);

      return {
        form: state.options.find((form) => form.name == formName) || null,
      };
    }),

  fetch: async () => {
    const { get } = getFetchClient();

    const response = await get("/team-builder/form");

    if (response.status != 200) set({ options: [] });

    set({ options: response.data });
  },
}));
