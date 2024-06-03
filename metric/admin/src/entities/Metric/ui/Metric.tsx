import { FC } from "react";
import { useAppSelector } from "@/app/store";
import { useGetMetricInfoQuery } from "../model/metricApi";
import MetricUI from "../config/instances/ui";
import { shallowEqual } from "react-redux";

interface MetricProps {
  id: string;
}

const Metric: FC<MetricProps> = ({ id }) => {
  const metric = useAppSelector(
    (state) => state.metric.metrics.find((m) => m.id === id),
    shallowEqual
  );

  const { data: metricInfoList } = useGetMetricInfoQuery();

  const metricInfo = metricInfoList?.find(
    (m) => m.name === metric?.name,
    shallowEqual
  );

  const dependencies = useAppSelector(
    (state) =>
      state.metric.metrics.filter(
        (m) =>
          metricInfo?.dependencies.includes(m.name) &&
          m.resource === metric?.resource
      ),
    shallowEqual
  );

  if (!metric) return <></>;

  return <MetricUI metric={metric} dependencies={dependencies} />;
};

export default Metric;
