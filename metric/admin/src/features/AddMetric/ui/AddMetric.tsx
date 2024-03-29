import { Dropdown } from "@/shared/ui/Dropdown";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  useCreateMetricMutation,
  useGetMetricNamesQuery,
} from "@/entities/Metric/model/metricApi";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { metricSlice } from "@/entities/Metric";
import { IAbstractMetricDetailed } from "@/entities/Metric/types";
import { Modal } from "@/shared/ui/Modal";

interface AddMetricProps {
  project: string;
  resource: string;
}

const AddMetric: FC<AddMetricProps> = ({ project, resource }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<IAbstractMetricDetailed | null>(
    null
  );

  const metrics = useAppSelector((state) => state.metric.metrics);
  const dispatch = useAppDispatch();

  const resourceMetrics = metrics.filter(
    (metric) => metric.resource == resource
  );

  const { data } = useGetMetricNamesQuery();

  const filteredData =
    data?.filter(
      (metric) => !resourceMetrics.find((m) => m.name == metric.name)
    ) || [];

  const [mutate, { data: createData, isLoading }] = useCreateMetricMutation();

  const handleSubmitClick = async () => {
    if (!selected) return;

    if (selected.dependencies.length > 0) {
      setIsOpen(true);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    if (!selected) return;

    await mutate({
      project: project,
      resource: resource,
      name: selected.name,
    });
    setSelected(null);
    setIsOpen(false);
  };

  useEffect(() => {
    createData?.forEach((metric) => {
      if (metric && !metrics.find((m) => m.id == metric.id)) {
        dispatch(metricSlice.actions.pushMetric(metric));
      }
    });
  }, [createData]);

  if (!data) return <div></div>;
  return (
    <>
      <div className="bg-background pt-5 rounded-lg pb-11 px-7">
        <Tooltip className="text-[#A3AED0]" tooltip="Select a metric to add">
          <h2 className="inline-block">Add Metric</h2>
        </Tooltip>
        <div className="pt-5" />
        <div className="flex justify-between items-center gap-11">
          <Dropdown
            placeholder="Select a metric"
            value={selected?.name || ""}
            onChange={(name) =>
              setSelected(data?.find((m) => m.name == name) || null)
            }
            namePrefix="new-metric"
            options={filteredData.map((metric) => metric.name)}
          />
          {!isLoading && (
            <button
              onClick={handleSubmitClick}
              className={
                "w-80 h-12 py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg " +
                (selected
                  ? "text-[#551FFF] bg-[#F3F0FF]"
                  : "text-black bg-[#E5E5E5]")
              }
            >
              Add Metric
            </button>
          )}
          {isLoading && (
            <div className="w-80 h-12 py-1 flex justify-center items-center text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg">
              <LoadingCircle size={26} />
            </div>
          )}
        </div>
      </div>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 rounded-lg pb-11">
          <h2 className="font-bold text-2xl text-primary">Add Metric</h2>
          <div className="pt-6">
            This metric will start additional dependencies:
            <ul className="py-2 list-disc flex flex-col items-center">
              {selected?.dependencies.map((dep) => (
                <li key={dep}>{dep}</li>
              ))}
            </ul>
          </div>
          <p className="pt-4 pb-6">Start the metric?</p>
          <div className="flex justify-center gap-10">
            <button
              onClick={() => setIsOpen(false)}
              className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="py-3 px-14 bg-[#551FFF] font-medium text-[#F3F0FF] rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddMetric;
