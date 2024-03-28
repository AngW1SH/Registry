import { IMetric } from "@/entities/Metric";
import { FC } from "react";
import Graph from "./Graph";
import { calculate } from "../model/calculate";
import { useData } from "../hooks/useData";
import { useAppSelector } from "@/app/store";

interface TotalCommitsProps extends IMetric {
  className?: string;
}

const TotalCommits: FC<TotalCommitsProps> = ({ className, ...metric }) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const data = useData(metric.data, calendar, metric.resource);

  const commitCount = calculate(data);

  if (!data.length)
    return (
      <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
        <h3 className="text-[#A3AED0] text-sm font-medium">Commits</h3>
        <div className="text-[#A3AED0] text-sm mt-2 font-medium">
          <div className="pt-3" />
          <span className="text-[#2B3674] pt-5 text-center text-2xl font-bold mr-2">
            No data has been collected
          </span>{" "}
        </div>
      </div>
    );

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <h3 className="text-[#A3AED0] text-sm font-medium">Commits</h3>
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

export default TotalCommits;
