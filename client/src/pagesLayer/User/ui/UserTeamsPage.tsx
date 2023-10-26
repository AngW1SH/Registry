import { UserTeams, UserTeamsEmpty } from "@/widgets/UserTeams";
import { FC } from "react";

interface UserTeamsPageProps {}

const UserTeamsPage: FC<UserTeamsPageProps> = () => {
  return <UserTeamsEmpty />;
};

export default UserTeamsPage;
