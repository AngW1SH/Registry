import { IMetric } from "@/entities/Metric";
import Metric from "@/entities/Metric/ui/Metric";
import { FC } from "react";

interface MetricListProps {
  metrics: IMetric[];
}

const MetricList: FC<MetricListProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-3">
      {metrics.map((metric) => (
        <Metric {...metric} />
      ))}
    </div>
  );
};

export default MetricList;
