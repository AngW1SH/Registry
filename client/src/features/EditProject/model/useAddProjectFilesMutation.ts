"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAddProjectFile } from "../api/fetchAddProjectFile";

export const useAddProjectFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: string; file: File; category: string }) => {
      return Promise.resolve(
        fetchAddProjectFile(data.projectId, data.file, data.category),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
