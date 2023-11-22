import { create } from "zustand";
import { IStudent, IStudentDetailed } from "../types";
import { staticStudentList } from "../static";
import { getFetchClient } from "@strapi/helper-plugin";

interface StudentState {
  students: IStudentDetailed[];
  active: IStudentDetailed[];
  setStudents: (newStudents: IStudentDetailed[]) => void;
  setActive: (newActive: string[]) => void;
  setActiveById: (newActive: number[]) => void;
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
  setActiveById: (newActive: number[]) =>
    set((state) => ({
      active: newActive
        .map((id) => state.students.find((student) => student.id == id)!)
        .filter((student) => student),
    })),
  setStudents: (newStudents: IStudentDetailed[]) =>
    set((state) => ({
      students: newStudents,
      active: state.active.filter((active) =>
        state.students.find((student) => student.id == active.id)
      ),
    })),
  fetchByForm: async (formId: number) => {
    const { get } = getFetchClient();

    const response = await get("/team-builder/student/" + formId);

    if (response.status != 200) set({ students: [] });

    set({ students: response.data });
  },
}));
