import { create } from "zustand";
import { IForm } from "../types";
import { staticFormList } from "../static";
import { getFetchClient } from "@strapi/helper-plugin";

interface FormState {
  selectedForm: number | null;
  options: IForm[];
  setSelectedForm: (formName: string) => void;
  getSelectedForm: () => IForm | null;
  setFormById: (id: number) => void;
  fetch: () => void;
  fields: string[] | null;
  setFields: (newFields: string[] | null) => void;
  displayedFields: string[] | null;
  setDisplayedFields: (newFields: string[] | null) => void;
}

export const useFormStore = create<FormState>()((set, get) => ({
  selectedForm: null,
  options: staticFormList,
  fields: null,
  displayedFields: null,
  setSelectedForm: (form?: string | number) => {
    if (!form) return set({ selectedForm: null });
    if (typeof form == "number") return set({ selectedForm: form });

    set((state) => {
      return {
        selectedForm:
          state.options.find((findForm) => findForm.name == form)?.id || null,
      };
    });
  },
  getSelectedForm: () => {
    const selectedFormId = get().selectedForm;
    return get().options.find((form) => form.id == selectedFormId) || null;
  },
  setFormById: (id: number) =>
    set((state) => {
      const form = state.options.find((form) => form.id == id);

      return {
        selectedForm: form?.id || null,
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
      displayedFields: newFields && newFields.length ? newFields : null,
    }));
  },
}));
