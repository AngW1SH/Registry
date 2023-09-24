"use client";
import { FC } from "react";
import { ProjectFilters } from "@/entities/ProjectFilters";

interface SearchWithProjectListProps {}

const SearchWithProjectList: FC<SearchWithProjectListProps> = () => {
  return <ProjectFilters />;
};

export default SearchWithProjectList;
