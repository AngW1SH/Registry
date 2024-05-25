import { FC } from "react";
import type { CodeOwnershipMetric } from "../types";
import { IMetric } from "@/entities/Metric";
import { Tooltip } from "@/shared/ui/Tooltip";
import { useFilter } from "../hooks/useFilter";
import { calculate } from "../model/calculate";
import Graph from "./Graph";

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

  if (!data.length) return <></>;

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <Tooltip
        className="w-full"
        tooltip={
          <div>
            <p>How is the code ownership distributed across users?</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">Code Ownership</h3>
      </Tooltip>
      <div className="pt-3" />
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
