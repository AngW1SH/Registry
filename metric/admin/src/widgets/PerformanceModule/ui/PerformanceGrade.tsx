import { Meter } from "@/shared/ui/Meter";
import { FC } from "react";
import { useGrades } from "../hooks/useGrades";

interface PerformanceGradeProps {
  className?: string;
}

const PerformanceGrade: FC<PerformanceGradeProps> = ({ className }) => {
  const grades = useGrades();

  const totalWeight = grades.reduce((a, b) => a + b.weight, 0);

  const totalSum = grades.reduce((a, b) => a + b.grade * b.weight, 0);

  const average = totalSum / totalWeight;

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <h3 className="text-[#A3AED0] font-medium">Performance Grade</h3>
      <p className="mt-4 text-[#2B3674] text-[50px]">
        <strong
          className="font-semibold"
          id={isNaN(average) || average == 0 ? "" : "performance-grade"}
        >
          {isNaN(average) ? "N/A" : average.toFixed(2)}
        </strong>
      </p>
      {!isNaN(average) && (
        <Meter className="mt-4" progress={(average / 5) * 100} />
      )}
    </div>
  );
};

export default PerformanceGrade;
