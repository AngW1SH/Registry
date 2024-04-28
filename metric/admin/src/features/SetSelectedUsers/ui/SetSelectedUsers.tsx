import { useAppDispatch, useAppSelector } from "@/app/store";
import { resourceSlice } from "@/entities/Resource";
import { MultiselectDropdown } from "@/shared/ui/MultiselectDropdown";
import { FC } from "react";

interface SetSelectedUsersProps {
  resourceId: string;
}

const SetSelectedUsers: FC<SetSelectedUsersProps> = ({ resourceId }) => {
  const dispatch = useAppDispatch();

  const platformId = useAppSelector((state) =>
    state.resource.resources.find((r) => r.id == resourceId)
  )?.platform;

  const platform = useAppSelector((state) =>
    state.platform.platforms.find((p) => p.id == platformId)
  );

  const users =
    useAppSelector(
      (state) => state.resource.resources.find((r) => r.id == resourceId)?.users
    ) || {};

  const memberData = useAppSelector((state) => state.member.members);

  const selected = Object.keys(users).filter((key) => users[key]);

  const labels = Object.keys(users).map((username) => {
    const data = memberData.find((member) => {
      return member.identifiers.find(({ platform: platformMap, value }) => {
        return platform?.name == platformMap && value == username;
      });
    });

    if (!data) return username;

    console.log(username + " - " + data.name + " - " + data.roles.join(", "));

    return username + " - " + data.name + " - " + data.roles.join(", ");
  });

  const handleChange = (selectedLabels: string[]) => {
    const values = selectedLabels.map((label) => {
      return label.split(" - ")[0];
    });
    dispatch(
      resourceSlice.actions.setActiveUsers({ resourceId, users: values })
    );
  };

  if (!users || !Object.keys(users).length) return <></>;

  return (
    <MultiselectDropdown
      onChange={handleChange}
      value={labels.filter((label) => selected.includes(label.split(" - ")[0]))}
      placeholder={
        selected.length ? "Users selected: " + selected.length : "Select users"
      }
      options={labels}
      namePrefix="users"
    />
  );
};

export default SetSelectedUsers;
