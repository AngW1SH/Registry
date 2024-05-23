import { FC } from "react";
import { GradeMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import { useFilter } from "../hooks/useFilter";
import Graph from "./Graph";
import { Tooltip } from "@/shared/ui/Tooltip";

interface GradeProps extends GradeMetric {
  dependencies: IMetric[];
  className?: string;
}

const Grade: FC<GradeProps> = ({ className, dependencies, ...metric }) => {
  const data = useFilter(metric.data);

  if (!data.length) return <></>;

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
        <h3 className="text-[#A3AED0] text-sm font-medium">Grade History</h3>
      </Tooltip>
      <div className="pt-3" />
      <Graph data={data} />
    </div>
  );
};

export default Grade;
