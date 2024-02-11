import { Meter } from "@/shared/ui/Meter";
import { FC } from "react";

interface PerformanceGradeProps {
  className?: string;
  grade: number;
}

const PerformanceGrade: FC<PerformanceGradeProps> = ({ grade, className }) => {
  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <h3 className="text-[#A3AED0] font-medium">Performance Grade</h3>
      <p className="mt-4 text-[#2B3674] text-[50px]">
        <strong className="font-semibold">{grade.toFixed(2)}</strong>
      </p>
      <Meter className="mt-4" progress={(grade / 5) * 100} />
    </div>
  );
};

export default PerformanceGrade;
