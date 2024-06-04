import { FC } from "react";
import type { CodeOwnershipMetric } from "../types";
import { IMetric } from "@/entities/Metric";
import { useFilter } from "../hooks/useFilter";
import { calculate } from "../model/calculate";
import Graph from "./Graph";
import TooltipModal from "./Modal";
import { getGrade } from "../model/getGrade";
import { MetricParamType } from "@/entities/Metric/types/params";
import { Meter } from "@/shared/ui/Meter";
import { useGrade } from "@/entities/Metric/hooks/useGrade";

interface CodeChurnProps extends CodeOwnershipMetric {
  dependencies: IMetric[];
  className?: string;
}

const CodeChurn: FC<CodeChurnProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const data = useFilter(dependencies, metric.resource);

  const result = calculate(data);

  const isGraded = metric.params?.find(
    (param) => param.name == "isGraded" && param.type == MetricParamType.boolean
  )?.value as boolean;

  const grade = getGrade(result);

  useGrade(metric, grade);

  if (!data.length) return <></>;

  return (
    <div
      className={
        "pt-9 relative pb-12 px-5 bg-background rounded-lg " + className
      }
    >
      <TooltipModal className="absolute top-9 right-4" />
      <h3 className="text-[#A3AED0] text-sm font-medium">Code Ownership</h3>
      <div className="pt-3" />
      {isGraded && typeof grade === "number" && (
        <div className="absolute bottom-4 right-4 w-1/3">
          <Meter progress={(grade / 5) * 100} label={"" + grade.toFixed(2)} />
        </div>
      )}
      <Graph data={result} />
      <div className="pt-3" />
      <div>
        <h4 className="font-medium text-[#2B3674]">
          {((result.majority.lines / result.global.lines) * 100).toFixed(0)}% of
          the codebase is owned by:
        </h4>
        <p className="text-[#2B3674]">{result.majority.users.join(", ")}</p>
      </div>
    </div>
  );
};

export default CodeChurn;
