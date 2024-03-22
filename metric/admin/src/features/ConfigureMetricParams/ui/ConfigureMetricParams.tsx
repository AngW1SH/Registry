import { useAppDispatch, useAppSelector } from "@/app/store";
import { IMetric, MetricField, metricSlice } from "@/entities/Metric";
import { IMetricParam } from "@/entities/Metric/types/params";
import { FC, useState } from "react";
import { useUpdateMetricMutation } from "@/entities/Metric/model/metricApi";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";

interface ConfigureMetricParamsProps {
  metric: IMetric;
}

const ConfigureMetricParams: FC<ConfigureMetricParamsProps> = ({ metric }) => {
  const dispatch = useAppDispatch();

  const metrics = useAppSelector((state) => state.metric.metrics);
  const [update, { isLoading }] = useUpdateMetricMutation();

  const [hasChanged, setHasChanged] = useState(false);

  const handleChange = (param: IMetricParam) => {
    setHasChanged(true);
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

  const handleSubmit = async () => {
    if (hasChanged) await update(metric);
    setHasChanged(false);
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
      <div className="pt-3" />
      {!isLoading && (
        <button
          onClick={handleSubmit}
          className={
            "py-3 w-full px-14 font-medium rounded-lg " +
            (hasChanged
              ? "text-[#551FFF] bg-[#F3F0FF]"
              : "text-black bg-[#E5E5E5]")
          }
        >
          Confirm Changes
        </button>
      )}
      {isLoading && (
        <div className="py-1 flex justify-center w-full px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg">
          <LoadingCircle size={24} />
        </div>
      )}
    </div>
  );
};

export default ConfigureMetricParams;
