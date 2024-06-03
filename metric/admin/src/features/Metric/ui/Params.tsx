import { useAppDispatch, useAppSelector } from "@/app/store";
import { IMetric, MetricField, metricSlice } from "@/entities/Metric";
import { IMetricParam } from "@/entities/Metric/types/params";
import { FC, useState } from "react";
import { useUpdateMetricMutation } from "@/entities/Metric/model/metricApi";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { shallowEqual } from "react-redux";

interface ParamsProps {
  metric: IMetric;
}

const Params: FC<ParamsProps> = ({ metric }) => {
  const dispatch = useAppDispatch();

  const metricParams =
    useAppSelector(
      (state) => state.metric.metrics.find((mapped) => mapped.id === metric.id),
      shallowEqual
    )?.params || [];

  // update locally until saved for performance reasons (store updates are visibly slow)
  const [localParams, setLocalParams] = useState(metricParams);

  const [update, { isLoading }] = useUpdateMetricMutation();

  const [hasChanged, setHasChanged] = useState(false);

  // Triggers when the user changes a field, only updates the local state
  const handleChange = (param: IMetricParam) => {
    setHasChanged(true);
    setLocalParams((prev) =>
      prev.map((p) => (p.name === param.name ? param : p))
    );
  };

  // Triggers when the user presses the 'confirm' button
  // Makes a request to the server and updates the store
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

  if (!metric.params.length) return <></>;

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

export default Params;
