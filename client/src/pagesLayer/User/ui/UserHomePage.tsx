import { UserHero } from "@/widgets/UserHero";
import {
  UserArchivePreview,
  UserFormsPreview,
  UserFormsWarningPreview,
  UserProfilePreview,
  UserProjectsPreview,
  UserRequestsPreview,
  UserRequestsTeamleadPreview,
  UserRequestsUnassignedPreview,
  UserTeamsMultiplePreview,
  UserTeamsPreview,
  UserTeamsTeamleadPreview,
  UserTeamsWarningPreview,
} from "@/widgets/UserPreview";
import { FC } from "react";

interface UserHomePageProps {}

const UserHomePage: FC<UserHomePageProps> = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <UserProfilePreview className="col-span-2" />
      <UserFormsPreview className="col-span-2" />
      <UserTeamsPreview className="col-span-2" />
      <UserRequestsPreview className="col-span-2" />
      <UserProjectsPreview className="col-span-3" />
      <UserArchivePreview className="col-span-1" />
    </div>
  );
};

export default UserHomePage;
