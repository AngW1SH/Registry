import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";
import { PullRequests } from "../../PullRequests";

export const useData = (
  data: PullRequests,
  calendar: { start: string | null; end: string | null },
  resourceId: string
) => {
  const successData = data.filter((item) => !item.error && item.data);

  const users = useSelectedUsers(resourceId);

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData
    .filter((item) => {
      if (
        startDate &&
        item.data.closed_at &&
        new Date(item.data.closed_at) < startDate
      )
        return false;
      if (endDate && new Date(item.data.created_at) > endDate) return false;

      return true;
    })
    .filter((item) => {
      return (
        !users.length ||
        (item.data.user && users.includes(item.data.user.login))
      );
    });
};
