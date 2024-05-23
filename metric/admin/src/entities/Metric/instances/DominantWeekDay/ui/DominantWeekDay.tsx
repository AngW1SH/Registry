import { FC } from "react";
import { DominantWeekDayMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import Graph from "./Graph";
import { Tooltip } from "@/shared/ui/Tooltip";
import { useFilter } from "../hooks/useFilter";

interface DominantWeekDayProps extends DominantWeekDayMetric {
  dependencies: IMetric[];
  className?: string;
}

const DominantWeekDay: FC<DominantWeekDayProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const data = useFilter(dependencies, metric.resource);

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
