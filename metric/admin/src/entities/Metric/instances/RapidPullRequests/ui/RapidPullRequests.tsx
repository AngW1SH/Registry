import { FC } from "react";
import { RapidPullRequestsMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import Graph from "./Graph";
import { useFilter } from "../hooks/useFilter";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { getGrade } from "../model/getGrade";
import { Tooltip } from "@/shared/ui/Tooltip";
import { calculate } from "../model/calculate";

interface RapidPullRequestsProps extends RapidPullRequestsMetric {
  dependencies: IMetric[];
  className?: string;
}

const RapidPullRequests: FC<RapidPullRequestsProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const data = useFilter(dependencies, metric.resource);

  const values = calculate(data, 7);

  useGrade(metric, getGrade(data));

  if (!values.filter((value) => value.data).length) return <></>;

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
        <Graph data={values} />
      </div>
    </div>
  );
};

export default RapidPullRequests;
