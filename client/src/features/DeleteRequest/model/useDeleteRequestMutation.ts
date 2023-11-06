import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteRequest } from "../api/fetchDeleteRequest";

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { requestId: number }) => {
      return Promise.resolve(fetchDeleteRequest(data.requestId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["available-requests"] });
    },
  });
};
