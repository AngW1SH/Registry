import { IMetric } from "@/entities/Metric";
import { FC } from "react";
import Graph from "./Graph";
import { calculate } from "../model/calculate";
import { useFilter } from "../hooks/useFilter";
import { useAppSelector } from "@/app/store";
import { TotalCommitsMetric } from "../types";
import { getGrade } from "../model/grade";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { Tooltip } from "@/shared/ui/Tooltip";
import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";
import { shallowEqual } from "react-redux";

interface TotalCommitsProps extends TotalCommitsMetric {
  dependencies: IMetric[];
  className?: string;
}

const TotalCommits: FC<TotalCommitsProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const calendar = useAppSelector(
    (state) => state.metric.calendar,
    shallowEqual
  );

  const data = useFilter(dependencies, metric.resource);

  const users = useSelectedUsers(metric.resource);

  const commitCount = calculate(data);

  useGrade(metric, getGrade(commitCount, data, calendar, users.length));

  if (!data.length) return <></>;

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <Tooltip
        className="w-full"
        tooltip={
          <div>
            <p>How many commits have been made in the selected period?</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">Total Commits</h3>
      </Tooltip>
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
