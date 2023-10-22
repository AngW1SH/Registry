import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "../api/sendRequest";

export const useRequestMutation = () => {
  return useMutation({
    mutationFn: (data: { team: number; files: File[]; project: number }) =>
      Promise.resolve(sendRequest(data.team, data.files, data.project)),
  });
};
