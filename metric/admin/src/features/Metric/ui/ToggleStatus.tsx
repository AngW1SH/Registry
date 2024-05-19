import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import {
  useStartMetricMutation,
  useStopMetricMutation,
} from "@/entities/Metric/model/metricApi";
import { PauseIcon, ResumeIcon } from "@/shared/ui/Icons";
import { FC } from "react";

interface ToggleStatusProps {
  metricId: string;
  className?: string;
}

const ToggleStatus: FC<ToggleStatusProps> = ({ metricId, className }) => {
  const [start] = useStartMetricMutation();
  const [stop] = useStopMetricMutation();

  const metric = useAppSelector((state) =>
    state.metric.metrics.find((m) => m.id === metricId)
  );

  const dispatch = useAppDispatch();

  if (!metric) return <></>;

  const handleStart = async () => {
    const result = await start(metric);

    if (!result.hasOwnProperty("error")) {
      dispatch(
        metricSlice.actions.updateStatus({
          metricId: metric.id,
          isTracked: true,
        })
      );
    }
  };

  const handleStop = async () => {
    const result = await stop(metric);

    if (!result.hasOwnProperty("error")) {
      dispatch(
        metricSlice.actions.updateStatus({
          metricId: metric.id,
          isTracked: false,
        })
      );
    }
  };

  return (
    <>
      {metric.isTracked && (
        <button
          onClick={handleStop}
          className={
            "bg-[#fef3c7] border-[#d3c89a] h-[3.25rem] text-[#252525] w-[3.25rem] border  flex justify-center items-center rounded-xl " +
            className
          }
        >
          <PauseIcon height="27" width="27" />
        </button>
      )}
      {!metric.isTracked && (
        <button
          onClick={handleStart}
          className={
            "bg-[#ecfccb] border-[#d6e2be] h-[3.25rem] text-[#252525] w-[3.25rem] border  flex justify-center items-center rounded-xl " +
            className
          }
        >
          <ResumeIcon height="22" width="22" />
        </button>
      )}
    </>
  );
};

export default ToggleStatus;
