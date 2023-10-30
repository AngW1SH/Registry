import { SendNewRequest } from "@/features/SendNewRequest";
import { FC } from "react";
import NewRequest from "./NewRequest";

interface UserRequestsProps {}

const UserRequests: FC<UserRequestsProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Заявки</h2>
      <div className="pt-2" />
      <NewRequest />
    </div>
  );
};

export default UserRequests;
