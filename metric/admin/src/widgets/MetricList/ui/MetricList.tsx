import { IMetric } from "@/entities/Metric";
import Metric from "@/entities/Metric/ui/Metric";
import { FC } from "react";

interface MetricListProps {
  metrics: IMetric[];
}

const MetricList: FC<MetricListProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {metrics.map((metric) => (
        <Metric key={metric.id + metric.data.length} {...metric} />
      ))}
    </div>
  );
};

export default MetricList;
