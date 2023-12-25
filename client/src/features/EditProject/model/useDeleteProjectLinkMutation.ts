"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteProjectFile } from "../api/fetchDeleteProjectFile";
import { fetchDeleteProjectLink } from "../api/fetchDeleteProjectLink";

export const useDeleteProjectLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: number; linkId: number }) => {
      return Promise.resolve(
        fetchDeleteProjectLink(data.projectId, data.linkId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
