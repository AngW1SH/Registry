import { FC } from "react";
import EditPersonalData from "./EditPersonalData";
import EditEducationData from "./EditEducationData";
import EditAccountData from "./EditAccountData";
import { Button } from "@/shared/ui";
import { Profile } from "@/composites/Profile";

interface EditUserProfileProps {
  profile: Profile;
}

const EditUserProfile: FC<EditUserProfileProps> = ({ profile }) => {
  return (
    <div>
      <EditPersonalData fullNameParam={profile.user.fullName} />
      <div className="pt-6" />
      <EditAccountData
        emailParam={profile.user.email}
        phoneParam={profile.user.phone}
      />
    </div>
  );
};

export default EditUserProfile;
