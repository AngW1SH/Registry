"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEditRequestFiles } from "../api/fetchEditRequestFiles";

export const useRequestFilesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { files: File[]; requestId: number }) => {
      return Promise.resolve(fetchEditRequestFiles(data.files, data.requestId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
