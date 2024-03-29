"use client";
import { IMember } from "@/entities/Member";
import { Button, FormInput, LoadingCircle } from "@/shared/ui";
import { FC, useEffect, useState } from "react";
import { useMemberMutation } from "@/features/EditMember";

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate({ member: { ...member, role } });
  };

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
    <form>
      <FormInput
        className="w-full md:w-1/2 lg:w-1/3"
        id={"member-role-" + member.id}
        label="Роль"
        value={role}
        onChange={setRole}
      />
      <div className="pt-8" />
      <Button
        type="submit"
        className="px-5 text-sm font-medium md:px-10 md:text-base"
        onClick={handleSubmit}
      >
        Подтвердить изменения
      </Button>
    </form>
  );
};

export default EditMember;
