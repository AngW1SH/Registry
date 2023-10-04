"use client";
import { FC } from "react";
import { ProjectFilters } from "@/entities/ProjectFilters";
import { initialFilters } from "@/entities/ProjectFilters/config/initialFilters";

interface SearchWithRedirectProps {}

const SearchWithRedirect: FC<SearchWithRedirectProps> = () => {
  return <ProjectFilters filters={initialFilters} dynamic={false} />;
};

export default SearchWithRedirect;
