import { create } from "zustand";
import { IStudent } from "../types";

interface SelectedStudentsState {
  students: IStudent[];
}

export const useSelectedStudentsStore = create<SelectedStudentsState>()(
  (set) => ({
    students: [],
    setStudents: (newStudents: IStudent[]) =>
      set((state) => ({ students: newStudents })),
  })
);
