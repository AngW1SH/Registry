import { FC } from "react";
import { PullRequestHangTimeMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import { useFilter } from "../hooks/useFilter";
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
  const data = useFilter(dependencies, metric.resource);

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
