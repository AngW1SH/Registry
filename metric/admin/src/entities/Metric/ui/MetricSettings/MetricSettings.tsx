import { Checkbox } from "@/shared/ui/Checkbox";
import { FC, ReactNode } from "react";
import UpdateStatus from "./UpdateStatus";
import { useData } from "../../hooks/useData";
import { useAppSelector } from "@/app/store";

interface MetricSettingsProps {
  className?: string;
  children: ReactNode;
  data: any;
  aside?: React.ReactNode;
}

const MetricSettings: FC<MetricSettingsProps> = ({
  className = "",
  children,
  aside,
  data: metricData,
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const data = useData(metricData, calendar);

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
      <div className="pt-10"></div>
      {aside && <div>{aside}</div>}
      <div className="pt-10"></div>
      <UpdateStatus data={data} />
    </div>
  );
};

export default MetricSettings;
