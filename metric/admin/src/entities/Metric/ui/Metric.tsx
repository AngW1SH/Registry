import { FC } from "react";
import { IMetric } from "..";
import { TotalCommits } from "../instances/TotalCommits";

interface MetricProps extends IMetric {}

const Metric: FC<MetricProps> = (metric) => {
  switch (metric.name) {
    case "TotalCommits":
      return <TotalCommits {...metric} />;
    default:
      return <div></div>;
  }
};

export default Metric;
