import { FC } from "react";
import EditPersonalData from "./EditPersonalData";
import EditEducationData from "./EditEducationData";
import EditAccountData from "./EditAccountData";
import { Button } from "@/shared/ui";

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
      <div className="pt-4" />
      <EditAccountData />
      <div className="pt-6" />
      <Button className="rounded-full px-14 pt-3">Сохранить</Button>
    </div>
  );
};

export default EditUserProfile;
