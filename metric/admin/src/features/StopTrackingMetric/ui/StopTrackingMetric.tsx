import { FC } from "react";
import { useDeleteMetricMutation } from "@/entities/Metric/model/metricApi";

interface StopTrackingMetricProps {
  className?: string;
  metricId: string;
}

const StopTrackingMetric: FC<StopTrackingMetricProps> = ({
  metricId,
  className,
}) => {
  const [stopTracking] = useDeleteMetricMutation();

  const handleClick = async () => {
    stopTracking(metricId);
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
