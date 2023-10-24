import { UserHero } from "@/widgets/UserHero";
import { UserProfilePreview } from "@/widgets/UserPreview";
import { FC } from "react";

interface UserHomePageProps {}

const UserHomePage: FC<UserHomePageProps> = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <UserProfilePreview className="col-span-3" />
    </div>
  );
};

export default UserHomePage;
