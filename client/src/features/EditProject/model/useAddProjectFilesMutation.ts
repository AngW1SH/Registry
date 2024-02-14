"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAddProjectFiles } from "../api/fetchAddProjectFiles";

export const useAddProjectFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: string; files: File[] }) => {
      return Promise.resolve(fetchAddProjectFiles(data.projectId, data.files));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
