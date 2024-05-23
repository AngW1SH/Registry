import { FC } from "react";
import { RapidPullRequestsMetric } from "../types";
import { IMetric, MetricName } from "@/entities/Metric/types";
import Graph from "./Graph";
import { useAppSelector } from "@/app/store";
import { PullRequestsMetric } from "../../PullRequests";
import { useData } from "../hooks/useData";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { getGrade } from "../models/getGrade";
import { Tooltip } from "@/shared/ui/Tooltip";

interface RapidPullRequestsProps extends RapidPullRequestsMetric {
  dependencies: IMetric[];
  className?: string;
}

const RapidPullRequests: FC<RapidPullRequestsProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const pullRequests = dependencies.find(
    (metric) => metric.name === MetricName.PullRequests
  ) as PullRequestsMetric;
  const data = useData(pullRequests?.data || [], calendar, metric.resource);

  useGrade(metric, getGrade(data));

  if (!data.length) return <></>;

  return (
    <div
      className={
        "flex flex-col pt-9 pb-12 px-5 bg-background rounded-lg " + className
      }
    >
      <Tooltip
        tooltip={
          <div>
            <p>How many requests are closed too quickly? (Within 5 minutes)</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">
          Rapid Pull Requests
        </h3>
      </Tooltip>
      <div className="my-auto pb-5">
        <Graph data={data} />
      </div>
    </div>
  );
};

export default RapidPullRequests;
