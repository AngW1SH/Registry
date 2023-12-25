"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAddProjectFiles } from "../api/fetchAddProjectFiles";
import { fetchAddProjectLink } from "../api/fetchAddProjectLink";

export const useAddProjectLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      projectId: number;
      resource: string;
      link: string;
    }) => {
      return Promise.resolve(
        fetchAddProjectLink(data.projectId, data.resource, data.link),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
