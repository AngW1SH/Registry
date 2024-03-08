import { FC } from "react";
import { IMetric } from "..";
import CommitsPerDay from "../instances/CommitsPerDay/ui/CommitsPerDay";

interface MetricProps extends IMetric {}

const Metric: FC<MetricProps> = (metric) => {
  switch (metric.name) {
    case "CommitsPerDay":
      return <CommitsPerDay {...metric} />;
    default:
      return <div></div>;
  }
};

export default Metric;
