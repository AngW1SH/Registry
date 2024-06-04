import { FC, useMemo } from "react";
import { RapidPullRequestsMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import Graph from "./Graph";
import { useFilter } from "../hooks/useFilter";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { getGrade } from "../model/getGrade";
import { calculate } from "../model/calculate";
import { Duration, MetricParamType } from "@/entities/Metric/types/params";
import TooltipModal from "./Modal";
import { Meter } from "@/shared/ui/Meter";

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

  const threshold: Duration = useMemo(() => {
    return (
      (metric.params?.find((param) => {
        return (
          param.name == "rapidPullRequestsThreshold" &&
          param.type == MetricParamType.duration
        );
      })?.value as Duration) || {
        number: 5,
        unitOfTime: "minutes",
      }
    );
  }, [metric]);

  const isGraded =
    (metric.params?.find((param) => {
      return param.name == "isGraded" && param.type == MetricParamType.boolean;
    })?.value as boolean) || false;

  const values = calculate(data, threshold, 7);

  const grade = getGrade(data, threshold);

  useGrade(metric, grade);

  if (!values.filter((value) => value.data).length) return <></>;

  return (
    <div
      className={
        "flex flex-col pt-9 pb-12 px-5 relative bg-background rounded-lg " +
        className
      }
    >
      {isGraded && (
        <div className="absolute bottom-4 right-4 w-1/3">
          <Meter progress={(grade / 5) * 100} label={"" + grade.toFixed(2)} />
        </div>
      )}
      <TooltipModal threshold={threshold} className="absolute top-9 right-4" />
      <h3 className="text-[#A3AED0] text-sm font-medium">
        Rapid Pull Requests
      </h3>
      <div className="my-auto pb-5">
        <Graph data={values} />
      </div>
    </div>
  );
};

export default RapidPullRequests;
