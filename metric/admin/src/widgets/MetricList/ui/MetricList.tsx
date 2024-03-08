import { IMetric } from "@/entities/Metric";
import Metric from "@/entities/Metric/ui/Metric";
import { FC } from "react";

interface MetricListProps {
  metrics: IMetric[];
}

const MetricList: FC<MetricListProps> = ({ metrics }) => {
  return (
    <ul className="grid grid-cols-3">
      {metrics.map((metric) => (
        <li key={metric.id}>
          <Metric {...metric} />
        </li>
      ))}
    </ul>
  );
};

export default MetricList;
