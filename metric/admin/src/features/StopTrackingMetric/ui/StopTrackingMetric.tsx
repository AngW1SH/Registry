import { FC } from "react";

interface StopTrackingMetricProps {
  className?: string;
}

const StopTrackingMetric: FC<StopTrackingMetricProps> = ({ className }) => {
  return (
    <button
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
