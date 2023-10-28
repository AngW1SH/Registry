"use client";
import { useProfileQuery } from "@/composites/Profile";
import { TeamDetailedCard } from "@/composites/TeamDetailed";
import { getTeamsByTeamIds } from "@/entities/Team";
import { FC } from "react";

interface UserTeamsProps {}

const UserTeams: FC<UserTeamsProps> = () => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  const teams = getTeamsByTeamIds(profile.user.teams, profile.teams);

  return (
    <div>
      <h2 className="text-3xl uppercase">Команды</h2>
      {teams.length > 0 && (
        <>
          <div className="pt-5" />
          {teams.map((team) => (
            <TeamDetailedCard
              key={team.id}
              team={team}
              projects={profile.projects}
              requests={profile.requests}
              users={profile.users}
              members={profile.members}
            />
          ))}
        </>
      )}
      {teams.length == 0 && (
        <>
          <div className="pt-10" />
          <p className="text-[#898989]">У вас пока нет активных команд</p>
        </>
      )}
    </div>
  );
};

export default UserTeams;
