import { Dropdown } from "@/shared/ui/Dropdown";
import { FC } from "react";

export enum ProjectSortType {
  name = "Sort by: Name",
  grade = "Sort by: Grade",
}

interface ChooseProjectListSortProps {
  selected: ProjectSortType;
  setSelected: (type: ProjectSortType) => void;
}

const ChooseProjectListSort: FC<ChooseProjectListSortProps> = ({
  selected,
  setSelected,
}) => {
  return (
    <div className="w-[400px]">
      <Dropdown
        namePrefix="project-sort"
        value={selected}
        onChange={setSelected as any}
        options={Array.from(Object.values(ProjectSortType))}
        className="text-sm bg-white"
        placeholder="Select sort type"
      />
    </div>
  );
};

export default ChooseProjectListSort;
