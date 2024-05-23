import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";
import { Commits } from "../../Commits";
import { Issues } from "../../Issues";
import { PullRequests } from "../../PullRequests";

export const useData = (
  data: {
    commits: Commits;
    pullRequests: PullRequests;
    issues: Issues;
  },
  calendar: { start: string | null; end: string | null },
  resourceId: string
) => {
  const successData = {
    commits: data.commits.filter((item) => !item.error && item.data),
    pullRequests: data.pullRequests.filter((item) => !item.error && item.data),
    issues: data.issues.filter((item) => !item.error && item.data),
  };

  const users = useSelectedUsers(resourceId);

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  // Yes, I do know that this is ridiculous, I will fix it later
  return {
    commits: successData.commits
      .filter((item) => {
        if (startDate && new Date(item.timestamp) < startDate) return false;
        if (endDate && new Date(item.timestamp) > endDate) return false;

        return true;
      })
      .filter((item) => {
        return (
          !users.length ||
          (item.data.author?.login && users.includes(item.data.author.login))
        );
      })
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
    pullRequests: successData.pullRequests
      .filter((item) => {
        if (startDate && new Date(item.timestamp) < startDate) return false;
        if (endDate && new Date(item.timestamp) > endDate) return false;

        return true;
      })
      .filter((item) => {
        return (
          !users.length ||
          (item.data.user && users.includes(item.data.user.login))
        );
      })
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
    issues: successData.issues
      .filter((item) => {
        if (startDate && new Date(item.timestamp) < startDate) return false;
        if (endDate && new Date(item.timestamp) > endDate) return false;

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
      })
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
  };
};
