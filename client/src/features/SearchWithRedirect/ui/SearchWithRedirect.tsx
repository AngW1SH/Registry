"use client";
import { FC } from "react";
import { ProjectFilters } from "@/entities/ProjectFilters";

interface SearchWithRedirectProps {}

const SearchWithRedirect: FC<SearchWithRedirectProps> = () => {
  return <ProjectFilters />;
};

export default SearchWithRedirect;
