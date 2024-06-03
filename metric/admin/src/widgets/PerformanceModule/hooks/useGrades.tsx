import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

export const useGrades = (resource: string) => {
  const grades = useAppSelector(
    (state) =>
      state.metric.grades.filter((grade) => grade.resourceId === resource),
    shallowEqual
  );
  const metrics = useAppSelector((state) => state.metric.metrics, shallowEqual);

  return grades
    .map((grade) => {
      const metric = metrics.find((metric) => metric.id === grade.metricId);

      if (!metric || typeof grade.grade !== "number" || isNaN(grade.grade))
        return false;

      const weight = metric.params.find((param) => param.name === "gradeWeight")
        ?.value as string | undefined;

      return {
        grade: grade.grade,
        weight: Number(weight) || 1,
        metricName: metric.name,
      };
    })
    .filter((grade) => grade) as {
    grade: number;
    weight: number;
    metricName: string;
  }[];
};
