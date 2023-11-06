"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteProjectFile } from "../api/fetchDeleteProjectFile";

export const useDeleteProjectFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: number; fileId: number }) => {
      return Promise.resolve(
        fetchDeleteProjectFile(data.projectId, data.fileId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
