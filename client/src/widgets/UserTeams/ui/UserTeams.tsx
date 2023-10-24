import { TeamDetailedCard } from "@/composites/TeamDetailed";
import { FC } from "react";

interface UserTeamsProps {}

const UserTeams: FC<UserTeamsProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Команды</h2>
      <div className="pt-5" />
      <TeamDetailedCard />
    </div>
  );
};

export default UserTeams;
