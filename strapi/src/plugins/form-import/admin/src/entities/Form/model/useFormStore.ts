import { create } from "zustand";
import { IForm, IFormQuestion } from "..";
import { getFetchClient } from "@strapi/helper-plugin";
import { IFormResults, IFormTemplate } from "../types";

interface FormState extends IForm {
  setForm: (form: IFormTemplate | null) => void;
  setResults: (results: IFormResults[]) => void;
  setSelected: (selected: number[]) => void;
}

export const useFormStore = create<FormState>()((set, get) => ({
  form: null,
  results: [],
  selected: [],
  setForm: (form: IFormTemplate | null) => set((state) => ({ form })),
  setResults: (results: IFormResults[]) =>
    set((state) => ({ results, selected: results.map((_, index) => index) })),
  setSelected: (selected: number[]) => set((state) => ({ selected })),
}));
