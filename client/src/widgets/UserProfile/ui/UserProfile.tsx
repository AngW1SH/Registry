"use client";
import { useProfileQuery } from "@/composites/Profile";
import { EditUserProfile } from "@/features/EditUserProfile";
import { FC } from "react";

interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = () => {
  const { data: profile, isLoading } = useProfileQuery();

  if (isLoading || !profile) return <></>;

  return (
    <div>
      <h2 className="text-3xl uppercase">Настройки профиля</h2>
      <div className="pt-5" />
      <EditUserProfile profile={profile} />
    </div>
  );
};

export default UserProfile;
