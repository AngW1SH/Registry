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
  fields: string[] | null;
  setFields: (newFields: string[] | null) => void;
  displayedFields: string[] | null;
  setDisplayedFields: (newFields: string[] | null) => void;
}

export const useFormStore = create<FormState>()((set) => ({
  form: null,
  options: staticFormList,
  fields: null,
  displayedFields: null,
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

  setFields: async (newFields: string[] | null) => {
    set((state) => ({ fields: newFields }));
  },
  setDisplayedFields: async (newFields: string[] | null) => {
    set((state) => ({
      displayedFields: newFields && newFields.length ? newFields : state.fields,
    }));
  },
}));
