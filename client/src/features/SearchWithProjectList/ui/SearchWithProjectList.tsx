"use client";
import { FC } from "react";
import {
  DetailedProjectFilters,
  ProjectFilters,
} from "@/entities/ProjectFilters";
import MultiselectDropdown from "@/shared/ui/MultiselectDropdown/MultiselectDropdown";

interface SearchWithProjectListProps {}

const SearchWithProjectList: FC<SearchWithProjectListProps> = () => {
  return (
    <>
      <div className="relative z-10 rounded-2xl bg-[#e0efef] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12">
        <ProjectFilters />
      </div>
      <div className="pt-5" />
      <DetailedProjectFilters />
    </>
  );
};

export default SearchWithProjectList;
