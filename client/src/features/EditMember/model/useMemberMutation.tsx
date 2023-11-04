"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEditMember } from "../api/fetchEditMember";
import { IMember } from "@/entities/Member";

export const useMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { member: IMember }) => {
      return Promise.resolve(fetchEditMember(data.member));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
