import { create } from "zustand";
import { IStudent, IStudentDetailed } from "../types";
import { staticStudentList } from "../static";
import { getFetchClient } from "@strapi/helper-plugin";

interface StudentState {
  students: IStudentDetailed[];
  selectedStudentIds: number[];
  setStudents: (newStudents: IStudentDetailed[]) => void;
  getSelectedStudents: () => IStudentDetailed[];
  setSelectedStudents: (students: string[] | number[]) => void;
  fetchByForm: (formId: number) => void;
}

export const useStudentStore = create<StudentState>()((set, get) => ({
  students: staticStudentList,
  selectedStudentIds: [],
  setSelectedStudents: (students: string[] | number[]) => {
    if (!students.length) return set((state) => ({ selectedStudentIds: [] }));

    const fieldKey = typeof students[0] == "number" ? "id" : "name";

    set((state) => ({
      selectedStudentIds: students
        .map(
          (name) =>
            state.students.find((student) => student[fieldKey] == name)!.id
        )
        .filter((student) => student),
    }));
  },
  getSelectedStudents: () => {
    return get()
      .selectedStudentIds.map(
        (selected) => get().students.find((student) => student.id == selected)!
      )
      .filter((student) => student);
  },
  setStudents: (newStudents: IStudentDetailed[]) =>
    set((state) => ({
      students: newStudents,
    })),
  fetchByForm: async (formId: number) => {
    const { get } = getFetchClient();

    const response = await get("/team-builder/student/" + formId);

    if (response.status != 200) set({ students: [] });

    set({ students: response.data });
  },
}));
