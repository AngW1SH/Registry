import { UserForms, UserFormsEmpty } from "@/widgets/UserForms";
import { FC } from "react";

interface UserFormsPageProps {}

const UserFormsPage: FC<UserFormsPageProps> = () => {
  return <UserFormsEmpty />;
};

export default UserFormsPage;
