import { IMetric } from "@/entities/Metric";
import { FC } from "react";
import Graph from "./Graph";
import { calculate } from "../model/calculate";
import { useData } from "../hooks/useData";
import { useAppSelector } from "@/app/store";
import { TotalCommitsMetric } from "../types";
import { CommitsMetric } from "../../Commits/types";
import { MetricName } from "@/entities/Metric/types";
import { getGrade } from "../model/grade";
import { useGrade } from "@/entities/Metric/hooks/useGrade";

interface TotalCommitsProps extends TotalCommitsMetric {
  dependencies: IMetric[];
  className?: string;
}

const TotalCommits: FC<TotalCommitsProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);
  const commits = dependencies.find(
    (metric) => metric.name === MetricName.Commits
  ) as CommitsMetric;
  const data = useData(commits?.data || [], calendar, metric.resource);

  const commitCount = calculate(data);

  useGrade(metric, getGrade(commitCount, data, calendar));

  if (!data.length)
    return (
      <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
        <h3 className="text-[#A3AED0] text-sm font-medium">Commits</h3>
        <div className="text-[#A3AED0] text-sm mt-2 font-medium">
          <div className="pt-3" />
          <span className="text-[#2B3674] pt-5 text-center text-2xl font-bold mr-2">
            No data has been collected for the selected period
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
