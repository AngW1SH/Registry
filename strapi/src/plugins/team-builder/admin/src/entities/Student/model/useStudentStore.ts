import { create } from "zustand";
import { IStudent } from "../types";
import { staticStudentList } from "../static";
import { getFetchClient } from "@strapi/helper-plugin";

interface StudentState {
  students: IStudent[];
  active: IStudent[];
  setStudents: (newStudents: IStudent[]) => void;
  setActive: (newActive: string[]) => void;
  clearActive: () => void;
  fetchByForm: (formId: number) => void;
}

export const useStudentStore = create<StudentState>()((set) => ({
  students: staticStudentList,
  active: [],
  setActive: (newActive: string[]) =>
    set((state) => ({
      active: newActive
        .map((name) => state.students.find((student) => student.name == name)!)
        .filter((student) => student),
    })),
  setStudents: (newStudents: IStudent[]) =>
    set((state) => ({ students: newStudents })),
  clearActive: () => set((state) => ({ active: [] })),
  fetchByForm: async (formId: number) => {
    const { get } = getFetchClient();

    const response = await get("/team-builder/student/" + formId);

    if (response.status != 200) set({ students: [] });

    set({ students: response.data });
  },
}));
