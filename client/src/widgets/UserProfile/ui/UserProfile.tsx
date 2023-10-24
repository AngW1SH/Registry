import { EditUserProfile } from "@/features/EditUserProfile";
import { FC } from "react";

interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Настройки профиля</h2>
      <div className="pt-5" />
      <EditUserProfile />
    </div>
  );
};

export default UserProfile;
