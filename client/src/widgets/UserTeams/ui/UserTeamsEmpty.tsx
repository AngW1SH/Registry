import { TeamDetailedCard } from "@/composites/TeamDetailed";
import { FC } from "react";

interface UserTeamsEmptyProps {}

const UserTeamsEmpty: FC<UserTeamsEmptyProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Команды</h2>
      <div className="pt-10" />
      <p className="text-[#898989]">У вас пока нет активных команд</p>
    </div>
  );
};

export default UserTeamsEmpty;
