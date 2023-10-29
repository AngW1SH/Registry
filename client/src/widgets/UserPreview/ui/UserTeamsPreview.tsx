"use client";
import { useProfileQuery } from "@/composites/Profile";
import { getMembersByMemberIds } from "@/entities/Member";
import { formatNameShort } from "@/entities/User";
import { NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserTeamsPreviewProps {
  className?: string;
}

/*
TODO: 

*/
const UserTeamsPreview: FC<UserTeamsPreviewProps> = ({ className }) => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  if (profile.user.teams.length > 1)
    return (
      <NamedBlock className={className} title="Команды">
        <div className="flex items-end justify-between pr-10">
          <p className="text-[0.9375rem] text-[#898989]">
            Количество команд,
            <br />
            где Вы являетесь участником
          </p>
          <div className="pr-4" />
          <p className="flex items-center justify-center text-4xl font-medium">
            {profile.user.teams.length}
          </p>
        </div>
        <div className="pt-7" />
        {profile.user.administratedTeams.length > 0 && (
          <div className="relative flex items-end justify-between pr-10">
            <p className="text-[0.9375rem] text-[#898989]">
              Количество команд,
              <br />
              где Вы являетесь представителем
            </p>
            <div className="pr-4" />
            <p className="flex items-center justify-center text-4xl font-medium">
              {profile.user.administratedTeams.length}
            </p>
            <div className="absolute bottom-px right-0 min-h-[2.5rem] min-w-[2.5rem] translate-x-1/2">
              <Image fill={true} src="/teamlead-icon.svg" alt="" />
            </div>
          </div>
        )}
      </NamedBlock>
    );

  if (profile.user.teams.length == 1) {
    const team = profile.teams.find((team) => team.id == profile.user.teams[0]);

    // Shouldn't really happen
    if (!team) return <div></div>;

    const membersPopulated = getMembersByMemberIds(
      team.members,
      profile.members,
    );

    // Get corresponding user for each member
    const displayData = membersPopulated.map((member) => ({
      member,
      user: profile.users.find((userMapped) => userMapped.id == member.user)!,
    }));

    return (
      <NamedBlock className={className} title="Команды">
        <ul className="flex flex-wrap text-center font-[0.9375rem] leading-7 text-[#898989] lg:text-left lg:text-sm xl:text-base">
          {displayData.map(({ user }) => (
            <li key={user.id} className="w-full sm:w-1/2">
              {formatNameShort(user.name)}
            </li>
          ))}
        </ul>
        <div className="pt-7" />
        {profile.user.administratedTeams.includes(team.id) && (
          <div className="flex items-center">
            <div className="relative min-h-[2.5rem] min-w-[2.5rem]">
              <Image fill={true} src="/teamlead-icon.svg" alt="" />
            </div>
            <div className="pr-5" />
            <p className="font-bold">Вы являетесь представителем команды</p>
          </div>
        )}
      </NamedBlock>
    );
  }

  return (
    <NamedBlock className={className} title="Команды">
      <p className="font-[0.9375rem] text-[#898989]">
        Команда пока не назначена
      </p>
    </NamedBlock>
  );
};

export default UserTeamsPreview;
