import { FC, ReactNode } from "react";
import UpdateStatus from "./UpdateStatus";
import { useData } from "../../hooks/useData";
import { useAppSelector } from "@/app/store";
import { useGetMetricInfoQuery } from "../../model/metricApi";
import { shallowEqual } from "react-redux";

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
  const calendar = useAppSelector(
    (state) => state.metric.calendar,
    shallowEqual
  );

  const data = useData(metricData, calendar);

  const { data: metricInfoList } = useGetMetricInfoQuery();

  const metricInfo = metricInfoList?.find((metric) => metric.name === name);

  return (
    <div className={"relative rounded-lg py-12 px-10 " + className}>
      <div className="flex justify-between gap-5 items-start">
        <h3 className="max-w-[50%] text-2xl font-semibold">{name}</h3>
        {aside && <div>{aside}</div>}
      </div>
      <div className="pt-6" />
      <div className="pt-4"></div>
      {children}
      <div className="pt-10"></div>
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
