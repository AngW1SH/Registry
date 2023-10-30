import { SendNewRequest } from "@/features/SendNewRequest";
import { FC } from "react";
import NewRequest from "./NewRequest";
import { RequestDetailedCard } from "@/composites/TeamDetailed";

interface UserRequestsProps {}

const UserRequests: FC<UserRequestsProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Заявки</h2>
      <div className="pt-2" />
      <NewRequest />
      <div className="pt-5" />
      <div className="flex gap-5">
        <RequestDetailedCard />
      </div>
    </div>
  );
};

export default UserRequests;
