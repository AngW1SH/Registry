import { useAppDispatch, useAppSelector } from "@/app/store";
import { resourceSlice } from "@/entities/Resource";
import { MultiselectDropdown } from "@/shared/ui/MultiselectDropdown";
import { FC } from "react";

interface SetSelectedUsersProps {
  resourceId: string;
}

const SetSelectedUsers: FC<SetSelectedUsersProps> = ({ resourceId }) => {
  const dispatch = useAppDispatch();

  const users =
    useAppSelector(
      (state) => state.resource.resources.find((r) => r.id == resourceId)?.users
    ) || {};
  const selected = Object.keys(users).filter((key) => users[key]);

  const handleChange = (selected: string[]) => {
    dispatch(
      resourceSlice.actions.setActiveUsers({ resourceId, users: selected })
    );
  };

  return (
    <MultiselectDropdown
      onChange={handleChange}
      value={selected}
      placeholder={
        selected.length ? "Users selected: " + selected.length : "Select users"
      }
      options={Object.keys(users)}
      namePrefix="users"
    />
  );
};

export default SetSelectedUsers;
