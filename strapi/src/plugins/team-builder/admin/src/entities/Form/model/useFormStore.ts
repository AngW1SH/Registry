import { create } from "zustand";
import { IForm } from "../types";
import { staticFormList } from "../static";
import { useStudentStore } from "../../Student";

interface FormState {
  form: IForm | null;
  options: IForm[];
  setForm: (formName: string) => void;
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
}));
