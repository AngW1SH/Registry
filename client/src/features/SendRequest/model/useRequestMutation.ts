import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "../api/sendRequest";

export const useRequestMutation = () => {
  return useMutation({
    mutationFn: (data: { team: number; files: File[]; project: string }) =>
      Promise.resolve(sendRequest(data.team, data.files, data.project)),
  });
};
