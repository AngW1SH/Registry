"use client";
import { useProfileQuery } from "@/composites/Profile";
import { ButtonAlt } from "@/shared/ui";
import { FC } from "react";
import { useDeleteRequest } from "../model/useDeleteRequestMutation";

interface DeleteRequestProps {
  requestId: number;
  teamId: number | null;
}

const DeleteRequest: FC<DeleteRequestProps> = ({ requestId, teamId }) => {
  const { data: profile } = useProfileQuery();
  const { mutate: deleteRequest } = useDeleteRequest();

  const handleConfirm = () => {
    if (teamId && profile) deleteRequest({ requestId });
  };

  if (!teamId || !profile || !profile.user.administratedTeams.includes(teamId))
    return <></>;

  return (
    <ButtonAlt
      onClick={handleConfirm}
      className="rounded-full border px-16 py-[0.65rem]"
    >
      Отозвать
    </ButtonAlt>
  );
};

export default DeleteRequest;
