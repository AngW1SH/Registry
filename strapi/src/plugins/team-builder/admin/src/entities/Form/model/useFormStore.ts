import { create } from "zustand";
import { IForm } from "../types";
import { staticFormList } from "../static";

interface FormState {
  form: IForm | null;
  options: IForm[];
  setForm: (formName: string) => void;
}

export const useFormStore = create<FormState>()((set) => ({
  form: null,
  options: staticFormList,
  setForm: (formName: string) =>
    set((state) => ({
      form: state.options.find((form) => form.name == formName) || null,
    })),
}));
