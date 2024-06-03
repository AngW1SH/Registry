import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import {
  useStartTrackingMutation,
  useStopTrackingMutation,
} from "@/entities/Resource/model/resourceApi";
import { GraphIcon, StopIcon } from "@/shared/ui/Icons";
import { FC } from "react";
import { shallowEqual } from "react-redux";

interface ToggleMetricsProps {
  resourceId: string;
}

const ToggleMetrics: FC<ToggleMetricsProps> = ({ resourceId }) => {
  const [start] = useStartTrackingMutation();
  const [stop] = useStopTrackingMutation();

  const dispatch = useAppDispatch();

  const metrics = useAppSelector((state) => state.metric.metrics, shallowEqual);
  const resource = useAppSelector(
    (state) => state.resource.resources.find((m) => m.id === resourceId),
    shallowEqual
  );

  // don't render if resource isn't in the store (yet)
  if (!resource) return <></>;

  const handleStart = async () => {
    const result = await start(resourceId);

    // If request is successful, set all resource metrics to 'tracked' state
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

    // If request is successful, set all resource metrics to 'not tracked' state
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
    <div className="flex gap-4 items-center">
      <button
        onClick={handleStop}
        className={
          "flex gap-3 items-center bg-[#fef3c7] font-semibold border border-[#d3c89a] rounded-lg whitespace-nowrap py-2 px-4 w-full text-sm"
        }
      >
        <StopIcon height="21.312" width="21.312" />
        <span>Stop Tracking All Metrics</span>
      </button>
      <button
        onClick={handleStart}
        className={
          "flex gap-3 items-center bg-[#ecfccb] font-semibold border border-[#d6e2be] rounded-lg whitespace-nowrap py-2 px-4 w-full text-sm"
        }
      >
        <GraphIcon height="24.75" width="20.5" />
        <span>Resume Tracking All Metrics</span>
      </button>
    </div>
  );
};

export default ToggleMetrics;
