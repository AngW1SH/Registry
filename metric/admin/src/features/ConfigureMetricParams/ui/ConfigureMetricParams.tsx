import { useAppDispatch, useAppSelector } from "@/app/store";
import { IMetric, MetricField, metricSlice } from "@/entities/Metric";
import { IMetricParam } from "@/entities/Metric/types/params";
import { FC } from "react";

interface ConfigureMetricParamsProps {
  metric: IMetric;
}

const ConfigureMetricParams: FC<ConfigureMetricParamsProps> = ({ metric }) => {
  const dispatch = useAppDispatch();

  const metrics = useAppSelector((state) => state.metric.metrics);

  const handleChange = (param: IMetricParam) => {
    dispatch(
      metricSlice.actions.setMetrics(
        metrics.map((metricMap) => {
          if (metricMap.id === metric.id) {
            return {
              ...metricMap,
              params: metricMap.params.map((paramMap) => {
                if (paramMap.name === param.name) {
                  return param;
                }
                return paramMap;
              }),
            };
          }
          return metricMap;
        })
      )
    );
  };

  return (
    <div>
      {metric.params.map((param) => (
        <MetricField
          className="py-5"
          key={param.name}
          param={param}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default ConfigureMetricParams;
