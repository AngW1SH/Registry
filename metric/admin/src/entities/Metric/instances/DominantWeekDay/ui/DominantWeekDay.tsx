import { FC } from "react";
import { DominantWeekDayMetric } from "../types";
import { IMetric, MetricName } from "@/entities/Metric/types";
import { useAppSelector } from "@/app/store";
import { useData } from "../hooks/useData";
import Graph from "./Graph";
import { Tooltip } from "@/shared/ui/Tooltip";
import { IssuesMetric } from "../../Issues/types";
import { CommitsMetric } from "../../Commits/types";
import { PullRequestsMetric } from "../../PullRequests";

interface DominantWeekDayProps extends DominantWeekDayMetric {
  dependencies: IMetric[];
  className?: string;
}

const DominantWeekDay: FC<DominantWeekDayProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const issues = dependencies.find(
    (dep) => dep.name === MetricName.Issues
  ) as IssuesMetric;

  const commits = dependencies.find(
    (dep) => dep.name === MetricName.Commits
  ) as CommitsMetric;

  const pullRequests = dependencies.find(
    (dep) => dep.name === MetricName.PullRequests
  ) as PullRequestsMetric;

  const data = useData(
    {
      issues: issues?.data || [],
      commits: commits?.data || [],
      pullRequests: pullRequests?.data || [],
    },
    calendar,
    metric.resource
  );

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <Tooltip
        className="w-full"
        tooltip={
          <div>
            <p>How has the grade been developing in the selected period?</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">
          Dominant Week Day
        </h3>
      </Tooltip>
      <div className="pt-3" />
      <Graph data={data} />
    </div>
  );
};

export default DominantWeekDay;
