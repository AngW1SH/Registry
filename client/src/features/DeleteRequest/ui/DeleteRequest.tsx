"use client";
import { useProfileQuery } from "@/composites/Profile";
import { ButtonAlt } from "@/shared/ui";
import { FC, useState } from "react";
import { useDeleteRequest } from "../model/useDeleteRequestMutation";
import { Modal } from "@/shared/ui/Modal";
import DeleteRequestConfirmModal from "./DeleteRequestConfirmModal";

interface DeleteRequestProps {
  requestId: number;
  teamId: number | null;
}

const DeleteRequest: FC<DeleteRequestProps> = ({ requestId, teamId }) => {
  const { data: profile } = useProfileQuery();
  const { mutate: deleteRequest } = useDeleteRequest();

  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    setShow(false);
    if (teamId && profile) deleteRequest({ requestId });
  };

  if (!teamId || !profile || !profile.user.administratedTeams.includes(teamId))
    return <></>;

  return (
    <>
      <ButtonAlt
        onClick={() => setShow(true)}
        className="rounded-full border px-16 py-[0.65rem]"
      >
        Отозвать
      </ButtonAlt>
      <DeleteRequestConfirmModal
        show={show}
        onClose={() => setShow(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteRequest;
