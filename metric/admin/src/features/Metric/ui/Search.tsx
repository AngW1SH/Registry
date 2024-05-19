import { useAppDispatch } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { SearchIcon } from "@/shared/ui/Icons";
import { TextInput } from "@/shared/ui/TextInput";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC, useEffect, useState } from "react";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(value, 250);

  useEffect(() => {
    dispatch(metricSlice.actions.setFilters({ search: debouncedValue }));
  }, [debouncedValue]);

  return (
    <div>
      <Tooltip className="text-[#A3AED0]" tooltip="Start typing a metric name">
        <h2 className="inline-block">Search Metric</h2>
      </Tooltip>
      <div className="pt-2" />
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#A3AED0]">
          <SearchIcon width="14.5" height="17.312" />
        </div>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pl-10"
          placeholder="Type a Metric Name"
        />
      </div>
    </div>
  );
};

export default Search;
