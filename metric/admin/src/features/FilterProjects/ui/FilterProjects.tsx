import { useAppDispatch } from "@/app/store";
import { projectListSlice } from "@/composites/ProjectInList";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useEffect, useState } from "react";

interface FilterProjectsProps {}

const FilterProjects: FC<FilterProjectsProps> = () => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState("");

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    dispatch(projectListSlice.actions.setFilters({ text: debouncedInput }));
  }, [debouncedInput]);

  return (
    <div className="w-[400px]">
      <TextInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-sm py-2 bg-white"
        placeholder="Enter text..."
      />
    </div>
  );
};

export default FilterProjects;
