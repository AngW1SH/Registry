import { useAppSelector } from "@/app/store";

export const useGrades = () => {
  const grades = useAppSelector((state) => state.metric.grades);
  const metrics = useAppSelector((state) => state.metric.metrics);

  return grades.filter((grade) => {
    const metric = metrics.find((metric) => metric.id === grade.metricId);

    if (!metric) return false;

    return metric.params.find((param) => param.name === "isGraded")?.value;
  });
};
