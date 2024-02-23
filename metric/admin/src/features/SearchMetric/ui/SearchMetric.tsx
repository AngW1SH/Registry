import { TextInput } from "@/shared/ui/TextInput";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC } from "react";

interface SearchMetricProps {}

const SearchMetric: FC<SearchMetricProps> = () => {
  return (
    <div className="bg-background pt-5 rounded-lg pb-11 px-7">
      <Tooltip className="text-[#A3AED0]" tooltip="Start typing a metric name">
        <h2 className="inline-block">Search Metric</h2>
      </Tooltip>
      <div className="pt-6" />
      <TextInput className="w-full" placeholder="Type a Metric Name" />
    </div>
  );
};

export default SearchMetric;
