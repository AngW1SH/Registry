"use client";
import { SendNewRequest } from "@/features/SendNewRequest";
import { FC } from "react";
import NewRequest from "./NewRequest";
import RequestInspectCard from "@/composites/RequestInspect/ui/RequestInspectCard";
import { useProfileQuery } from "@/composites/Profile";
import { useAuthQuery } from "@/entities/User";

interface UserRequestsProps {}

const UserRequests: FC<UserRequestsProps> = () => {
  const { data: user } = useAuthQuery();
  const { data: profile } = useProfileQuery();

  if (!profile || !user) return <div></div>;

  return (
    <div>
      <h2 className="text-3xl uppercase">Заявки</h2>
      <div className="pt-2" />
      <NewRequest />
      <div className="pt-5" />
      <div className="flex gap-5">
        {profile.requests.length > 0 &&
          profile.requests.map((request) => (
            <RequestInspectCard
              user={user}
              requestInspect={{
                request,
                teams: profile.teams,
                members: profile.members,
                users: profile.users,
                projects: profile.projects,
              }}
              key={request.id}
            />
          ))}

        {profile.requests.length == 0 && (
          <p className="text-[#898989]">У вас пока нет активных заявок</p>
        )}
      </div>
    </div>
  );
};

export default UserRequests;
