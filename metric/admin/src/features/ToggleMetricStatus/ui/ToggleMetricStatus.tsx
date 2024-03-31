import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import {
  useStartMetricMutation,
  useStopMetricMutation,
} from "@/entities/Metric/model/metricApi";
import { FC } from "react";

interface ToggleMetricStatusProps {
  metricId: string;
  className?: string;
}

const ToggleMetricStatus: FC<ToggleMetricStatusProps> = ({
  metricId,
  className,
}) => {
  const [start] = useStartMetricMutation();
  const [stop] = useStopMetricMutation();

  const metric = useAppSelector((state) =>
    state.metric.metrics.find((m) => m.id === metricId)
  );

  const dispatch = useAppDispatch();

  if (!metric) return <></>;

  const handleStart = async () => {
    const result = await start(metric);

    if (!result.hasOwnProperty("error")) {
      dispatch(
        metricSlice.actions.updateMetric({ ...metric, isTracked: true })
      );
    }
  };

  const handleStop = async () => {
    const result = await stop(metric);

    if (!result.hasOwnProperty("error")) {
      dispatch(
        metricSlice.actions.updateMetric({ ...metric, isTracked: false })
      );
    }
  };

  return (
    <>
      {metric.isTracked && (
        <button
          onClick={handleStop}
          className={
            "bg-[#fef3c7] text-[#a16207] py-1 px-7 font-medium text-sm rounded-xl " +
            className
          }
        >
          Stop Tracking
        </button>
      )}
      {!metric.isTracked && (
        <button
          onClick={handleStart}
          className={
            "bg-[#ecfccb] text-[#4d7c0f] py-1 px-7 font-medium text-sm rounded-xl " +
            className
          }
        >
          Resume Tracking
        </button>
      )}
    </>
  );
};

export default ToggleMetricStatus;
