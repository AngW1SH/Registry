import { create } from "zustand";
import { IForm, IFormQuestion } from "..";

interface FormState extends IForm {
  setType: (type: string | null) => void;
  setResults: (results: IFormQuestion[][]) => void;
  setSelected: (selected: number[]) => void;
}

export const useFormStore = create<FormState>()((set, get) => ({
  type: null,
  results: [],
  selected: [],
  setType: (type: string | null) => set((state) => ({ type })),
  setResults: (results: IFormQuestion[][]) =>
    set((state) => ({ results, selected: results.map((_, index) => index) })),
  setSelected: (selected: number[]) => set((state) => ({ selected })),
}));
