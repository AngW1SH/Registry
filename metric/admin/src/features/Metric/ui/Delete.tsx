import { FC, useState } from "react";
import {
  useDeleteMetricMutation,
  useGetMetricInfoQuery,
} from "@/entities/Metric/model/metricApi";
import { Modal } from "@/shared/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import { TrashIcon } from "@/shared/ui/Icons";

interface DeleteProps {
  className?: string;
  metricId: string;
}

const Delete: FC<DeleteProps> = ({ metricId, className }) => {
  const dispatch = useAppDispatch();

  const metric = useAppSelector((state) =>
    state.metric.metrics.find((m) => m.id === metricId)
  );
  // Only use the metrics for this resource
  const metrics = useAppSelector((state) =>
    state.metric.metrics.filter((m) => m.resource == metric?.resource)
  );

  const [deleteMetric] = useDeleteMetricMutation();
  const { data: metricInfo } = useGetMetricInfoQuery();

  // Find all the abstract metric info for the metrics that depend on this one
  const dependantsInfo = metric
    ? metricInfo?.filter((m) => m.dependencies.includes(metric.name))
    : [];

  // find the metric data for the dependants
  const dependants = metrics.filter((m) => {
    return dependantsInfo?.find((d) => d.name == m.name);
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    const result = await deleteMetric(metricId);

    if (!result.hasOwnProperty("error")) {
      dispatch(metricSlice.actions.popMetric(metricId));
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "bg-[#FFE7DF] h-[3.25rem] text-[#252525] w-[3.25rem] border border-[#e3cecb] flex justify-center items-center rounded-xl " +
          className
        }
      >
        <TrashIcon height="22" width="22" />
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 rounded-lg pb-11">
          {!dependants.length && (
            <>
              <h2 className="font-bold text-2xl text-primary">Stop Tracking</h2>
              <p className="py-6">
                Are you sure you want to stop tracking this metric?
              </p>
              <div className="flex justify-center gap-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="py-3 px-14 bg-[#FFE7DF] font-medium text-[#BC2F26] rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </>
          )}
          {!!dependants.length && (
            <>
              <h2 className="font-bold text-2xl text-primary">
                Cannot Delete This Metric
              </h2>
              <p className="py-6">This metric has active dependants:</p>
              <ul className="list-disc w-max mx-auto pl-5">
                {dependants.map((m) => (
                  <li className="text-primary" key={m.id}>
                    {m.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Delete;
