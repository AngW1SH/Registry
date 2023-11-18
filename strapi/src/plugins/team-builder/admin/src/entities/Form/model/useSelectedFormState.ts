import { create } from "zustand";
import { IForm } from "../types";

interface SelectedFormState {
  form: IForm | null;
}

export const useSelectedFormStore = create<SelectedFormState>()((set) => ({
  form: null,
  setForm: (newForm: IForm) => set((state) => ({ form: newForm })),
}));
