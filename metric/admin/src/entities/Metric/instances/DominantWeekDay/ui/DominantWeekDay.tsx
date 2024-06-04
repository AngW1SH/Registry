import { FC } from "react";
import { DominantWeekDayMetric } from "../types";
import { IMetric } from "@/entities/Metric/types";
import Graph from "./Graph";
import { Tooltip } from "@/shared/ui/Tooltip";
import { useFilter } from "../hooks/useFilter";
import { calculate } from "../model/calculate";
import { getGrade } from "../model/getGrade";
import { useGrade } from "@/entities/Metric/hooks/useGrade";
import { MetricParamType } from "@/entities/Metric/types/params";
import { Meter } from "@/shared/ui/Meter";

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

  const unwantedDay = metric.params.find(
    (param) => param.name === "unwantedWeekDay"
  )?.value as string | undefined;
  const values = calculate(data);

  const isGraded =
    (metric.params?.find((param) => {
      return param.name == "isGraded" && param.type == MetricParamType.boolean;
    })?.value as boolean) || false;

  const grade = getGrade(values, unwantedDay || "Not Specified");

  const max = Math.max(...values.map((item) => item.data));

  useGrade(metric, grade);

  return (
    <div
      className={
        "pt-9 pb-12 relative px-5 bg-background rounded-lg " + className
      }
    >
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
      {isGraded && typeof grade === "number" && (
        <div className="absolute bottom-4 right-4 w-1/3">
          <Meter progress={(grade / 5) * 100} label={"" + grade.toFixed(2)} />
        </div>
      )}
      <div className="pt-3" />
      <Graph data={values} />
      <div className="pt-3" />
      <div>
        <h4 className="font-medium text-[#2B3674]">
          The most productive day of the week is:
        </h4>
        <p className="text-[#2B3674]">
          {values.find((value) => value.data == max)?.label}
        </p>
      </div>
    </div>
  );
};

export default DominantWeekDay;
