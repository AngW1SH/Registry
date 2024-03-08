import { IMetric } from "@/entities/Metric";
import { FC, useEffect } from "react";
import Graph from "./Graph";

interface CommitsPerDayProps extends IMetric {
  className?: string;
}

const CommitsPerDay: FC<CommitsPerDayProps> = ({ className, ...metric }) => {
  useEffect(() => {
    console.log(metric);
  });
  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <h3 className="text-[#A3AED0] text-sm font-medium">Commits Per Day</h3>
      <div className="text-[#A3AED0] text-sm mt-2 font-medium">
        <span className="text-[#2B3674] text-4xl font-bold mr-2">24</span> Total
        Commits
      </div>
      <div className="pt-3" />
      <Graph />
    </div>
  );
};

export default CommitsPerDay;
