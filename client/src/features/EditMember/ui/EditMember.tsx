"use client";
import { IMember } from "@/entities/Member";
import { IUser } from "@/entities/User";
import { Button, FormInput, LoadingCircle } from "@/shared/ui";
import { FC, useEffect, useState } from "react";
import { useMemberMutation } from "../model/useMemberMutation";

interface EditMemberProps {
  member: IMember;
  onSuccess?: () => any;
}

const EditMember: FC<EditMemberProps> = ({ member, onSuccess }) => {
  const [role, setRole] = useState(member.role);

  const { mutate, isLoading, isError, isSuccess } = useMemberMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) onSuccess();
  }, [isSuccess]);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center pt-10">
        <LoadingCircle />
      </div>
    );

  if (isError)
    return (
      <div>
        <p>
          Произошла ошибка при обновлении пользователя. Попробуйте обновить
          страницу
        </p>
      </div>
    );

  return (
    <div>
      <FormInput
        className="w-1/3"
        id={"member-role-" + member.id}
        label="Роль"
        value={role}
        onChange={setRole}
      />
      <div className="pt-8" />
      <Button
        className="px-10 font-medium"
        onClick={() => mutate({ member: { ...member, role } })}
      >
        Подтвердить изменения
      </Button>
    </div>
  );
};

export default EditMember;
