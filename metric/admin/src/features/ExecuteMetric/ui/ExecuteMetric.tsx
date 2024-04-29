import { useAppSelector } from "@/app/store";
import { useExecuteMetricMutation } from "@/entities/Metric/model/metricApi";
import { RefreshIcon } from "@/shared/ui/Icons";
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
        "bg-[#e9edf8] border-[#e2e7f5] h-[3.25rem] text-[#252525] w-[3.25rem] border  flex justify-center items-center rounded-xl " +
        className
      }
    >
      <RefreshIcon height="22" width="22" />
    </button>
  );
};

export default ExecuteMetric;
