import { useAppSelector } from "@/app/store";
import { useExecuteMetricMutation } from "@/entities/Metric/model/metricApi";
import { FC } from "react";

interface ExecuteMetricProps {
  metricId: string;
  className?: string;
}

const ExecuteMetric: FC<ExecuteMetricProps> = ({ metricId, className }) => {
  const [execute] = useExecuteMetricMutation();

  const metric = useAppSelector((state) =>
    state.metric.metrics.find((m) => m.id === metricId)
  );

  const handleClick = async () => {
    if (metric) console.log(await execute(metric));
  };

  return (
    <button
      onClick={handleClick}
      className={
        "bg-secondary text-primary py-1 px-7 font-medium text-sm rounded-xl " +
        className
      }
    >
      Update Metric
    </button>
  );
};

export default ExecuteMetric;
