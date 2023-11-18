import { create } from "zustand";
import { IStudent } from "../types";

interface AvailableStudentsState {
  students: IStudent[];
}

export const useAvailableStudentsStore = create<AvailableStudentsState>()(
  (set) => ({
    students: [],
    setStudents: (newStudents: IStudent[]) =>
      set((state) => ({ students: newStudents })),
  })
);
