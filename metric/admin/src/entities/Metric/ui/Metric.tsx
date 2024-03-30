import { FC } from "react";
import { IMetric } from "..";
import { TotalCommits } from "../instances/TotalCommits";
import IssueCompleteness from "../instances/IssueCompleteness/ui/IssueCompleteness";

interface MetricProps extends IMetric {}

const Metric: FC<MetricProps> = (metric) => {
  switch (metric.name) {
    case "TotalCommits":
      return <TotalCommits {...metric} />;
    case "IssueCompleteness":
      return <IssueCompleteness {...metric} />;
    default:
      return <></>;
  }
};

export default Metric;
