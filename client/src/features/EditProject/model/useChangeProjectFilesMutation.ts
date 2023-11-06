"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchChangeProjectFile } from "../api/fetchChangeProjectFiles";

export const useChangeProjectFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      projectId: number;
      fileId: number;
      files: File[];
    }) => {
      return Promise.resolve(
        fetchChangeProjectFile(data.projectId, data.fileId, data.files),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
