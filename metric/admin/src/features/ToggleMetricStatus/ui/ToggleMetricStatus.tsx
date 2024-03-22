import { IMetric } from "@/entities/Metric";
import {
  useStartMetricMutation,
  useStopMetricMutation,
} from "@/entities/Metric/model/metricApi";
import { FC } from "react";

interface ToggleMetricStatusProps {
  metric: IMetric;
  className?: string;
}

const ToggleMetricStatus: FC<ToggleMetricStatusProps> = ({
  metric,
  className,
}) => {
  const [start] = useStartMetricMutation();
  const [stop] = useStopMetricMutation();

  const handleStart = async () => {
    await start(metric);
  };

  const handleStop = async () => {
    await stop(metric);
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
