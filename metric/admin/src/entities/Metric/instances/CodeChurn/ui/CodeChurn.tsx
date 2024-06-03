import { FC, Fragment } from "react";
import { CodeChurnMetric } from "../types";
import { IMetric } from "@/entities/Metric";
import { Tooltip } from "@/shared/ui/Tooltip";
import { useFilter } from "../hooks/useFilter";
import { calculate } from "../model/calculate";

interface CodeChurnProps extends CodeChurnMetric {
  dependencies: IMetric[];
  className?: string;
}

const CodeChurn: FC<CodeChurnProps> = ({
  className,
  dependencies,
  ...metric
}) => {
  const data = useFilter(dependencies, metric.resource);

  const { average, median, mostChanged } = calculate(data);

  if (!data.length) return <></>;

  return (
    <div className={"pt-9 pb-12 px-5 bg-background rounded-lg " + className}>
      <Tooltip
        className="w-full"
        tooltip={
          <div>
            <p>How many times on average does a file change?</p>
          </div>
        }
      >
        <h3 className="text-[#A3AED0] text-sm font-medium">Code Churn</h3>
      </Tooltip>
      <div className="pt-3" />
      <div className="flex">
        <div className="w-1/2">
          <h4 className="font-medium text-[#2B3674]">Avg:</h4>
          <p className="text-[#2B3674] text-[50px] font-bold">
            {average.toFixed(2)}
          </p>
        </div>
        <div className="w-1/2 text-center">
          <h4 className="font-medium text-[#2B3674]">Median:</h4>
          <p className="text-[#2B3674] text-[50px] font-bold">
            {median.toFixed(0)}
          </p>
        </div>
      </div>
      <div className="max-w-full">
        <h4 className="font-medium text-[#2B3674] pb-2">Most changed files:</h4>
        {!!mostChanged.length && (
          <div className="grid grid-cols-2">
            <div className="font-medium text-[#2B3674]">File</div>
            <div className="font-medium text-[#2B3674] text-center">Count</div>
            {mostChanged.map((file) => (
              <Fragment key={file.key}>
                <div
                  className="max-w-full overflow-hidden overflow-ellipsis"
                  title={file.key}
                >
                  {file.key}
                </div>
                <div className="text-center" key={file.key + "-" + file.value}>
                  {file.value}
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeChurn;
