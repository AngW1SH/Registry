import { UserHero } from "@/widgets/UserHero";
import {
  UserFormsPreview,
  UserProfilePreview,
  UserTeamsPreview,
} from "@/widgets/UserPreview";
import { FC } from "react";

interface UserHomePageProps {}

const UserHomePage: FC<UserHomePageProps> = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <UserProfilePreview className="col-span-3" />
      <UserFormsPreview className="col-span-3" />
      <UserTeamsPreview className="col-span-3" />
    </div>
  );
};

export default UserHomePage;
