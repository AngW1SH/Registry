"use client";
import { FC } from "react";
import {
  Filters,
  ProjectFilters,
  serializeFilterParams,
} from "@/entities/ProjectFilters";
import { initialFilters } from "@/entities/ProjectFilters/config/initialFilters";
import { useRouter } from "next/navigation";

interface SearchWithRedirectProps {}

const SearchWithRedirect: FC<SearchWithRedirectProps> = () => {
  const router = useRouter();

  const redirect = (filters: Filters) => {
    router.replace(`/projects/${serializeFilterParams(filters)}`);
  };

  return (
    <ProjectFilters
      onConfirm={redirect}
      filters={initialFilters}
      dynamic={false}
    />
  );
};

export default SearchWithRedirect;
