"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEditPersonalData } from "../api/fetchEditPersonalData";

export const usePersonalDataMutation = (
  onComplete: (isError: boolean) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      fullName: {
        name: string;
        surname: string;
        patronymic: string;
      };
    }) => {
      return Promise.resolve(fetchEditPersonalData(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });
      onComplete(false);
    },
    onError: () => {
      onComplete(true);
    },
  });
};
