"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEditAccountData } from "../api/fetchEditAccountData";

export const useAccountDataMutation = (
  onComplete: (isError: boolean) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; phone: string }) => {
      return Promise.resolve(fetchEditAccountData(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      onComplete(false);
    },
    onError: () => {
      onComplete(true);
    },
  });
};
