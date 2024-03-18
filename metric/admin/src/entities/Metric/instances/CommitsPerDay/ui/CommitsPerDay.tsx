import { IMetric } from "@/entities/Metric";
import { FC } from "react";
import Graph from "./Graph";
import { calculate } from "../model/calculate";
import { useData } from "../hooks/useData";

interface CommitsPerDayProps extends IMetric {
  className?: string;
}

const CommitsPerDay: FC<CommitsPerDayProps> = ({ className, ...metric }) => {
  console.log(metric.data);
  const data = useData(metric.data);

  const commitCount = calculate(data);

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <h3 className="text-[#A3AED0] text-sm font-medium">Commits Per Day</h3>
      <div className="text-[#A3AED0] text-sm mt-2 font-medium">
        <span className="text-[#2B3674] text-4xl font-bold mr-2">
          {commitCount}
        </span>{" "}
        Total Commits
      </div>
      <div className="pt-3" />
      <Graph data={data} />
    </div>
  );
};

export default CommitsPerDay;
