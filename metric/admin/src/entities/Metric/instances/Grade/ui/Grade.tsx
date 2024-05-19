import { FC } from "react";
import { GradeMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import { useAppSelector } from "@/app/store";
import { useData } from "../hooks/useData";
import Graph from "./Graph";
import { Tooltip } from "@/shared/ui/Tooltip";

interface GradeProps extends GradeMetric {
  dependencies: IMetric[];
  className?: string;
}

const Grade: FC<GradeProps> = ({ className, dependencies, ...metric }) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const data = useData(metric.data, calendar);

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
      {data.length && <Graph data={data} />}
      {!data.length && (
        <div className="text-[#A3AED0] text-sm mt-2 font-medium">
          <div className="pt-3" />
          <span className="text-[#2B3674] pt-5 text-center text-2xl font-bold mr-2">
            No data has been collected for the selected period
          </span>{" "}
        </div>
      )}
    </div>
  );
};

export default Grade;
