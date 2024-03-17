import { FC } from "react";
import { fetchStopTracking } from "../api/fetchStopTracking";

interface StopTrackingMetricProps {
  className?: string;
  metricId: string;
}

const StopTrackingMetric: FC<StopTrackingMetricProps> = ({
  metricId,
  className,
}) => {
  const handleClick = async () => {
    fetchStopTracking(metricId);
  };

  return (
    <button
      onClick={handleClick}
      className={
        "bg-[#FFE7DF] text-[#BC2F26] py-1 px-7 font-medium text-sm rounded-xl " +
        className
      }
    >
      Stop Tracking
    </button>
  );
};

export default StopTrackingMetric;
