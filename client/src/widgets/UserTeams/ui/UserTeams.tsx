"use client";
import { useProfileQuery } from "@/composites/Profile";
import { TeamInspectCard } from "@/composites/TeamInspect";
import { getTeamsByTeamIds } from "@/entities/Team";
import { useAuthQuery } from "@/entities/User";
import { FC } from "react";

interface UserTeamsProps {}

const UserTeams: FC<UserTeamsProps> = () => {
  const { data: user } = useAuthQuery();
  const { data: profile } = useProfileQuery();

  if (!profile || !user) return <div></div>;

  const teams = getTeamsByTeamIds(profile.user.teams, profile.teams);

  return (
    <div>
      <h2 className="text-3xl uppercase">Команды</h2>
      {teams.length > 0 && (
        <>
          <div className="pt-5" />
          {teams.map((team) => (
            <TeamInspectCard
              key={team.id}
              user={user}
              teamDetailed={{
                team,
                projects: profile.projects,
                requests: profile.requests,
                users: profile.users,
                members: profile.members,
              }}
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
