import { IMetric, MetricField } from "@/entities/Metric";
import { FC } from "react";

interface ConfigureMetricParamsProps {
  metric: IMetric;
}

const ConfigureMetricParams: FC<ConfigureMetricParamsProps> = ({ metric }) => {
  return (
    <div>
      {metric.params.map((param) => (
        <MetricField
          className="py-5"
          key={param.name}
          param={param}
          onChange={() => {}}
        />
      ))}
    </div>
  );
};

export default ConfigureMetricParams;
