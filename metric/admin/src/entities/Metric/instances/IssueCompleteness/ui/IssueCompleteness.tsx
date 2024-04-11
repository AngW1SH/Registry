import { useAppSelector } from "@/app/store";
import { IMetric } from "@/entities/Metric";
import { FC } from "react";
import { useData } from "../hooks/useData";
import { calculate } from "../model/calculate";
import { Meter } from "@/shared/ui/Meter";

interface IssueCompletenessProps extends IMetric {
  dependencies: IMetric[];
  className?: string;
}

const IssueCompleteness: FC<IssueCompletenessProps> = ({
  className,
  ...metric
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const data = useData(metric.data, calendar);

  const { completed, total } = calculate(data);

  if (!data.length)
    return (
      <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
        <h3 className="text-[#A3AED0] text-sm font-medium">
          Issue Completeness
        </h3>
        <div className="text-[#A3AED0] text-sm mt-2 font-medium">
          <div className="pt-3" />
          <span className="text-[#2B3674] pt-5 text-center text-2xl font-bold mr-2">
            No data has been collected
          </span>{" "}
        </div>
      </div>
    );

  return (
    <div
      className={
        "flex flex-col pt-9 pb-12 px-5 bg-background rounded-lg " + className
      }
    >
      <h3 className="text-[#A3AED0] text-sm font-medium">Issue Completeness</h3>
      <div className="my-auto pb-5">
        <div className="mt-3 flex justify-between">
          <div className="text-[#A3AED0] text-sm mt-2 font-medium">
            <span className="text-[#2B3674] text-4xl font-bold mr-2">
              {completed}
            </span>{" "}
            Completed Issues
          </div>
          <div className="text-[#A3AED0] text-sm mt-2 font-medium">
            <span className="text-[#2B3674] text-4xl font-bold mr-2">
              {total}
            </span>{" "}
            Total Issues
          </div>
        </div>
        <Meter className="mt-6" progress={(completed / total) * 100} />
      </div>
    </div>
  );
};

export default IssueCompleteness;
