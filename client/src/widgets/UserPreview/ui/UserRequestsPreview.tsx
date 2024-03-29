"use client";
import { useProfileQuery } from "@/composites/Profile";
import { Button, NamedBlock } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface UserRequestsPreviewProps {
  className?: string;
}

const UserRequestsPreview: FC<UserRequestsPreviewProps> = ({ className }) => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  return (
    <NamedBlock
      className={className}
      title={"Заявки на проекты"}
      link="/user/requests"
    >
      <div className="flex h-full flex-col items-start">
        <div className="flex items-end">
          <p className="font-[0.9375rem] text-[#898989]">
            Представителями
            <br />
            Ваших команд подано заявок
          </p>
          <div className="pr-16" />
          <p className="flex items-center justify-center text-4xl font-medium">
            {profile.requests.length}
          </p>
        </div>
        <div className="pt-11" />
        {profile.user.administratedTeams.length > 0 && (
          <Link href="/user/requests">
            <Button className="mt-auto rounded-full px-8 py-3">
              Управление заявками
            </Button>
          </Link>
        )}
      </div>
    </NamedBlock>
  );
};

export default UserRequestsPreview;
