"use client";
import { useMutation } from "@tanstack/react-query";
import { fetchEditRequestFiles } from "../api/fetchEditRequestFiles";

export const useRequestFilesMutation = () => {
  return useMutation({
    mutationFn: (data: { files: File[]; requestId: number }) => {
      return Promise.resolve(fetchEditRequestFiles(data.files, data.requestId));
    },
  });
};
