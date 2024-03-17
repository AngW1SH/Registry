import { Dropdown } from "@/shared/ui/Dropdown";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC, useState } from "react";
import {
  useCreateMetricMutation,
  useGetMetricNamesQuery,
} from "../model/useGetMetricNamesQuery";

interface AddMetricProps {
  project: string;
  resource: string;
}

const AddMetric: FC<AddMetricProps> = ({ project, resource }) => {
  const [selected, setSelected] = useState("");

  const { data } = useGetMetricNamesQuery();

  const [mutate] = useCreateMetricMutation();

  const handleConfirm = () => {
    if (!selected) return;
    mutate({
      project: project,
      resource: resource,
      name: selected,
    });
  };

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
          options={data}
        />
        <button
          onClick={handleConfirm}
          className="min-w-max py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
        >
          Add Metric
        </button>
      </div>
    </div>
  );
};

export default AddMetric;
