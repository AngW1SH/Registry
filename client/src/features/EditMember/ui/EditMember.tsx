"use client";
import { IMember } from "@/entities/Member";
import {
  Button,
  Dropdown,
  FormInput,
  LoadingCircle,
  MultiselectDropdown,
} from "@/shared/ui";
import { FC, useEffect, useState } from "react";
import { useMemberMutation } from "@/features/EditMember";
import { fetchUserRole } from "../api/fetchUserRole";
import Image from "next/image";

interface EditMemberProps {
  member: IMember;
  onSuccess?: () => any;
}

const EditMember: FC<EditMemberProps> = ({ member, onSuccess }) => {
  const [roles, setRoles] = useState(member.roles);

  const { mutate, isLoading, isError, isSuccess } = useMemberMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) onSuccess();
  }, [isSuccess]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate({ member: { ...member, roles } });
  };

  const handleRemoveRole = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    let current = e.target;
    while (
      current.parentElement &&
      current != e.currentTarget &&
      !current.dataset.role
    ) {
      current = current.parentElement;
    }

    if (current.dataset.role)
      setRoles(roles.filter((tag) => tag != "" + current.dataset.role));
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
      <div className="flex flex-col items-start gap-x-10 lg:flex-row">
        <div className="md:min-w-[50%] lg:min-w-[33%]">
          <p className="pb-1 text-xs text-[#898989]">Роль</p>
          <MultiselectDropdown
            namePrefix={"roles-" + member.id}
            items={roles}
            placeholder="Напишите роль"
            onChange={setRoles}
            fetchSuggestions={fetchUserRole}
            className="bg-inherit w-full border-b border-black p-2"
          />
        </div>
        {roles !== null && roles.length != 0 && (
          <ul
            className="flex flex-wrap gap-4 pt-4 text-sm"
            onClick={handleRemoveRole}
          >
            {roles.map((role) => (
              <li
                className="relative rounded-full bg-white py-2 pl-6 pr-10"
                key={role}
                data-role={role}
              >
                {role}
                <div className="absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer">
                  <Image src="/x-gray.svg" alt="" fill={true} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

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
