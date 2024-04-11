import { Checkbox } from "@/shared/ui/Checkbox";
import { FC, ReactNode } from "react";
import UpdateStatus from "./UpdateStatus";
import { useData } from "../../hooks/useData";
import { useAppSelector } from "@/app/store";
import { useGetMetricNamesQuery } from "../../model/metricApi";

interface MetricSettingsProps {
  className?: string;
  children: ReactNode;
  data: any;
  name: string;
  aside?: React.ReactNode;
}

const MetricSettings: FC<MetricSettingsProps> = ({
  className = "",
  children,
  aside,
  data: metricData,
  name,
}) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const data = useData(metricData, calendar);

  const { data: metricInfoList } = useGetMetricNamesQuery();

  const metricInfo = metricInfoList?.find((metric) => metric.name === name);

  return (
    <div
      className={
        "bg-background relative pt-7 rounded-lg pb-11 px-7 " + className
      }
    >
      <h3 className="text-xl text-[#A3AED0] font-medium">{name}</h3>
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
      {metricInfo && metricInfo.snapshotBased && !!data.length && (
        <UpdateStatus data={data} />
      )}
      {metricInfo?.dependencies && !!metricInfo.dependencies.length && (
        <div>
          <h3 className="text-xl text-[#A3AED0] font-medium">Dependencies</h3>
          <div className="pt-4"></div>
          <ul className="grid grid-cols-2 list-disc pl-5 gap-4 text-[#A3AED0]">
            {metricInfo.dependencies.map((dependency) => (
              <li key={dependency}>{dependency}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MetricSettings;
