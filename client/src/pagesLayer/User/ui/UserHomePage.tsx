import { UserHero } from "@/widgets/UserHero";
import { FC } from "react";

interface UserHomePageProps {}

const UserHomePage: FC<UserHomePageProps> = () => {
  return (
    <>
      <UserHero />
    </>
  );
};

export default UserHomePage;
