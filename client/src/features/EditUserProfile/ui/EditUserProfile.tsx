import { FC } from "react";
import EditPersonalData from "./EditPersonalData";
import EditEducationData from "./EditEducationData";

interface EditUserProfileProps {}

/*
Technically, this should be a Widget, not a Feature, because almost no fields are interactive rn,
but I still thought it would make more sense to place it here
*/

const EditUserProfile: FC<EditUserProfileProps> = () => {
  return (
    <div>
      <EditPersonalData />
      <div className="pt-4" />
      <EditEducationData />
    </div>
  );
};

export default EditUserProfile;
