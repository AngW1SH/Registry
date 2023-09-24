import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface ProjectsSearchProps {}

const ProjectsSearch: FC<ProjectsSearchProps> = () => {
  return (
    <div className="relative z-10 rounded-2xl bg-[#e0efef] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12">
      <SearchWithRedirect />
    </div>
  );
};

export default ProjectsSearch;
