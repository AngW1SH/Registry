import { FC } from "react";
import { PullRequestHangTimeMetric } from "../types";
import { IMetric, MetricName } from "@/entities/Metric/types";
import { useData } from "../hooks/useData";
import { useAppSelector } from "@/app/store";
import { PullRequestsMetric } from "../../PullRequests";
import Graph from "./Graph";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { getGrade } from "../model/getGrade";
import { Tooltip } from "@/shared/ui/Tooltip";

interface PullRequestHangTimeProps extends PullRequestHangTimeMetric {
  dependencies: IMetric[];
  className?: string;
}

const PullRequestHangTime: FC<PullRequestHangTimeProps> = ({
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
            <p>How much time does it take for a pull request to be closed?</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">
          Pull Request Hang Time
        </h3>
      </Tooltip>
      <div className="my-auto pb-5">
        <Graph data={data} />
      </div>
    </div>
  );
};

export default PullRequestHangTime;
