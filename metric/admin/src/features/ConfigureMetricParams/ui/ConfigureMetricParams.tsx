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

  const metricParams =
    useAppSelector((state) =>
      state.metric.metrics.find((mapped) => mapped.id === metric.id)
    )?.params || [];

  const [localParams, setLocalParams] = useState(metricParams);

  const [update, { isLoading }] = useUpdateMetricMutation();

  const [hasChanged, setHasChanged] = useState(false);

  const handleChange = (param: IMetricParam) => {
    setHasChanged(true);
    setLocalParams((prev) =>
      prev.map((p) => (p.name === param.name ? param : p))
    );
  };

  const handleSubmit = async () => {
    if (hasChanged) await update({ ...metric, params: localParams });
    dispatch(
      metricSlice.actions.updateParams({
        metricId: metric.id,
        params: localParams,
      })
    );
    setHasChanged(false);
  };

  return (
    <div>
      {localParams.map((param) => (
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
