import { Meter } from "@/shared/ui/Meter";
import { FC } from "react";

export interface Metric {
  name: string;
  grade: number;
}

interface MetricListProps {
  type: "best" | "worst";
  data: Metric[];
  className?: string;
}

const MetricList: FC<MetricListProps> = ({ type, data, className = "" }) => {
  return (
    <div
      className={
        "pt-8 flex flex-col pb-10 pl-7 pr-10 bg-background rounded-lg " +
        className
      }
    >
      {type == "best" && (
        <h3 className="text-xl text-[#A3AED0] font-medium">
          <span className="text-[#36AD18] font-bold">Best</span> Metrics
        </h3>
      )}
      {type == "worst" && (
        <h3 className="text-xl text-[#A3AED0] font-medium">
          <span className="text-[#C61010] font-bold">Worst</span> Metrics
        </h3>
      )}
      <ul className="mt-6 flex h-full justify-between flex-col gap-y-2">
        {data.map((row) => (
          <li key={row.name + "-" + type} className="flex justify-between ">
            <p className="font-medium text-[#2B3674] text-ellipsis overflow-hidden whitespace-nowrap max-w-[55%]">
              {row.name}
            </p>
            <div className="w-1/3">
              <Meter
                progress={(row.grade / 5) * 100}
                label={"" + row.grade.toFixed(2)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetricList;
