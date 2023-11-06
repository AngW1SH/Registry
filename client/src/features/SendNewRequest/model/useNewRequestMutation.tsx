"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSendRequest } from "../api/fetchSendRequest";

export const useNewRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { teamId: number; files: File[]; project: number }) => {
      return Promise.resolve(
        fetchSendRequest(data.teamId, data.files, data.project),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-requests"],
      });
    },
  });
};
