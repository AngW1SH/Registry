import { FC } from "react";
import PerformanceGrade from "./PerformanceGrade";
import MetricList from "./MetricList";
import { useGrades } from "../hooks/useGrades";

interface PerformanceModuleProps {
  resource: string;
}

const PerformanceModule: FC<PerformanceModuleProps> = ({ resource }) => {
  const grades = useGrades(resource);

  let sorted = [...grades];

  sorted.sort((a, b) => b.grade! - a.grade!);

  const best = sorted.slice(0, 3).map((data) => ({
    name: data.metricName,
    grade: data.grade,
  }));

  const worst = sorted.slice(-3).map((data) => ({
    name: data.metricName,
    grade: data.grade,
  }));

  return (
    <div className="flex gap-8">
      <PerformanceGrade resource={resource} className="flex-1" />
      <MetricList data={best} type="best" className="flex-[2]" />
      <MetricList data={worst} type="worst" className="flex-[2]" />
    </div>
  );
};

export default PerformanceModule;
