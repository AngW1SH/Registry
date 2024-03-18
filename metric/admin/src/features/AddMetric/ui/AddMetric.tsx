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

interface AddMetricProps {
  project: string;
  resource: string;
}

const AddMetric: FC<AddMetricProps> = ({ project, resource }) => {
  const [selected, setSelected] = useState("");

  const metrics = useAppSelector((state) => state.metric.metrics);
  const dispatch = useAppDispatch();

  const resourceMetrics = metrics.filter(
    (metric) => metric.resource == resource
  );

  const { data } = useGetMetricNamesQuery();

  const filteredData =
    data?.filter(
      (name) => !resourceMetrics.find((metric) => metric.name == name)
    ) || [];

  const [mutate, { data: createData, isLoading }] = useCreateMetricMutation();

  const handleConfirm = () => {
    if (!selected) return;
    mutate({
      project: project,
      resource: resource,
      name: selected,
    });
    setSelected("");
  };

  useEffect(() => {
    console.log(createData);
    if (createData && !metrics.find((metric) => metric.id == createData.id)) {
      dispatch(metricSlice.actions.pushMetric(createData));
    }
  }, [createData]);

  if (!data) return <div></div>;
  return (
    <div className="bg-background pt-5 rounded-lg pb-11 px-7">
      <Tooltip className="text-[#A3AED0]" tooltip="Select a metric to add">
        <h2 className="inline-block">Add Metric</h2>
      </Tooltip>
      <div className="pt-5" />
      <div className="flex justify-between items-center gap-11">
        <Dropdown
          placeholder="Select a metric"
          value={selected}
          onChange={setSelected}
          namePrefix="new-metric"
          options={filteredData}
        />
        {!isLoading && (
          <button
            onClick={handleConfirm}
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
  );
};

export default AddMetric;
