import { useQuery } from "@tanstack/react-query";
import { getProjectFileTypes } from "../api/getProjectFileTypes";

export function useProjectFileTypeQuery() {
  return useQuery<string[]>({
    queryKey: ["project-file-type"],
    queryFn: () => getProjectFileTypes(),
    keepPreviousData: true,
  });
}
