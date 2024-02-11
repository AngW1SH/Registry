import { FC } from "react";
import PerformanceGrade from "./PerformanceGrade";
import MetricList, { Metric } from "./MetricList";

interface PerformanceModuleProps {}

const best: Metric[] = [
  {
    name: "Open/Closed PR Ratio",
    grade: 4.85,
  },
  {
    name: "Community Standards",
    grade: 4.52,
  },
  {
    name: "Code Churn",
    grade: 4.09,
  },
];

const worst: Metric[] = [
  {
    name: "Test Coverage",
    grade: 0.46,
  },
  {
    name: "Documentation Clarity",
    grade: 1.24,
  },
  {
    name: "Overdue Tasks",
    grade: 2.77,
  },
];

const PerformanceModule: FC<PerformanceModuleProps> = () => {
  return (
    <div className="flex gap-8">
      <PerformanceGrade grade={4.37} className="flex-1" />
      <MetricList data={best} type="best" className="flex-[2]" />
      <MetricList data={worst} type="worst" className="flex-[2]" />
    </div>
  );
};

export default PerformanceModule;
