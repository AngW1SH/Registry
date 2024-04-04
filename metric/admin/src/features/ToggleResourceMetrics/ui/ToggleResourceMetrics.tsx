import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import {
  useStartTrackingMutation,
  useStopTrackingMutation,
} from "@/entities/Resource/model/resourceApi";
import { FC } from "react";

interface ToggleResourceMetricsProps {
  resourceId: string;
}

const ToggleResourceMetrics: FC<ToggleResourceMetricsProps> = ({
  resourceId,
}) => {
  const [start] = useStartTrackingMutation();
  const [stop] = useStopTrackingMutation();

  const dispatch = useAppDispatch();

  const metrics = useAppSelector((state) => state.metric.metrics);

  const resource = useAppSelector((state) =>
    state.resource.resources.find((m) => m.id === resourceId)
  );

  if (!resource) return <></>;

  const handleStart = async () => {
    const result = await start(resourceId);

    console.log(result);

    if (!result.hasOwnProperty("error")) {
      dispatch(
        metricSlice.actions.setMetrics(
          metrics.map((metric) => {
            if (metric.resource === resourceId) {
              return {
                ...metric,
                isTracked: true,
              };
            }
            return metric;
          })
        )
      );
    }
  };

  const handleStop = async () => {
    const result = await stop(resourceId);

    if (!result.hasOwnProperty("error")) {
      dispatch(
        metricSlice.actions.setMetrics(
          metrics.map((metric) => {
            if (metric.resource === resourceId) {
              return {
                ...metric,
                isTracked: false,
              };
            }
            return metric;
          })
        )
      );
    }
  };

  return (
    <div className="flex gap-10">
      <button
        onClick={handleStop}
        className={
          "bg-[#fef3c7] text-[#a16207] py-3 px-7 w-full font-medium text-sm rounded-xl"
        }
      >
        Stop Tracking All Metrics
      </button>
      <button
        onClick={handleStart}
        className={
          "bg-[#ecfccb] text-[#4d7c0f] py-1 px-7 w-full font-medium text-sm rounded-xl"
        }
      >
        Resume Tracking All Metrics
      </button>
    </div>
  );
};

export default ToggleResourceMetrics;
