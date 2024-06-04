import { FC } from "react";
import { PullRequestHangTimeMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import { useFilter } from "../hooks/useFilter";
import Graph from "./Graph";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { getGrade } from "../model/getGrade";
import { Tooltip } from "@/shared/ui/Tooltip";
import { MetricParamType } from "@/entities/Metric/types/params";
import { Meter } from "@/shared/ui/Meter";

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

  const isGraded =
    (metric.params?.find((param) => {
      return param.name == "isGraded" && param.type == MetricParamType.boolean;
    })?.value as boolean) || false;

  const grade = getGrade(data);

  useGrade(metric, grade);

  if (!data.length) return <></>;

  return (
    <div
      className={
        "flex flex-col pt-9 pb-12 px-5 relative bg-background rounded-lg " +
        className
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
      {isGraded && typeof grade === "number" && (
        <div className="absolute bottom-4 right-4 w-1/3">
          <Meter progress={(grade / 5) * 100} label={"" + grade.toFixed(2)} />
        </div>
      )}
      <div className="my-auto pb-5">
        <Graph data={data} />
      </div>
    </div>
  );
};

export default PullRequestHangTime;
