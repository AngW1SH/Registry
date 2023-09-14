import { TagSlider } from "@/entities/Tag";
import { FC } from "react";

interface ActiveProjectsProps {}

const ActiveProjects: FC<ActiveProjectsProps> = () => {
  return (
    <div>
      <TagSlider />
    </div>
  );
};

export default ActiveProjects;
