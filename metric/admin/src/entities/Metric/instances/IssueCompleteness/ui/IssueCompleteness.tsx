import { useAppSelector } from "@/app/store";
import { IMetric } from "@/entities/Metric";
import { FC } from "react";
import { useData } from "../hooks/useData";
import { IssueCompletenessMetric } from "../types";
import { IssuesMetric } from "../../Issues/types";
import { MetricName } from "@/entities/Metric/types";
import Graph from "./Graph";
import { Tooltip } from "@/shared/ui/Tooltip";

interface IssueCompletenessProps extends IssueCompletenessMetric {
  dependencies: IMetric[];
  className?: string;
}

const IssueCompleteness: FC<IssueCompletenessProps> = ({
  className,
  dependencies,
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const issues = dependencies.find(
    (dep) => dep.name === MetricName.Issues
  ) as IssuesMetric;
  const data = useData(issues?.data || [], calendar);

  return (
    <div
      className={
        "flex flex-col pt-9 pb-12 px-5 bg-background rounded-lg " + className
      }
    >
      <Tooltip
        tooltip={
          <div>
            <p>
              What is the relation between the number of opened and closed
              issues?
            </p>
            <p>&#123; opened &#125; / &#123; closed &#125;</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">
          Issue Completeness
        </h3>
      </Tooltip>
      {data.length && (
        <div className="my-auto pb-5">
          <Graph data={data} />
        </div>
      )}
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

export default IssueCompleteness;
