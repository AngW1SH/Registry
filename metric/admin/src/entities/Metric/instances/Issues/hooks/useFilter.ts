import { useSelectedUsers } from "@/entities/Metric";
import { Issues } from "../types";
import { useAppSelector } from "@/app/store";

export const useFilter = (data: Issues, resourceId: string) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const successData = data.filter((item) => !item.error && item.data) || [];

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  const users = useSelectedUsers(resourceId);

  return successData
    .filter((item) => {
      if (startDate && new Date(item.data.created_at) < new Date(startDate))
        return false;
      if (endDate && new Date(item.data.created_at) > endDate) return false;

      return true;
    })
    .filter((item) => {
      // if we don't select a specific user, show all data
      if (!users.length) return true;

      // if there's selected users and no assignees are set, don't show data
      if (!item.data.assignees.length) return false;

      // if at least one assignee is selected, show data
      for (let i = 0; i < item.data.assignees.length; i++) {
        if (users.includes(item.data.assignees[i].login)) return true;
      }

      return false;
    });
};
