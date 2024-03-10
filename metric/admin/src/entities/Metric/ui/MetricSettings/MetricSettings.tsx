import { Checkbox } from "@/shared/ui/Checkbox";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, ReactNode } from "react";
import UpdateStatus from "./UpdateStatus";
import { StopTrackingMetric } from "@/features/StopTrackingMetric";

interface MetricSettingsProps {
  className?: string;
  children: ReactNode;
}

const MetricSettings: FC<MetricSettingsProps> = ({
  className = "",
  children,
}) => {
  return (
    <div
      className={
        "bg-background relative pt-7 rounded-lg pb-11 px-7 " + className
      }
    >
      <h3 className="text-xl text-[#A3AED0] font-medium">Commits Per Day</h3>
      <div className="pt-6" />
      <Checkbox
        className="text-[#A3AED0]"
        id="commits-per-day"
        label="Use this metric for grading"
      />
      <div className="pt-4"></div>
      {children}
      <div className="pt-6"></div>
      <UpdateStatus />
      <StopTrackingMetric className="absolute top-7 right-5" />
    </div>
  );
};

export default MetricSettings;
