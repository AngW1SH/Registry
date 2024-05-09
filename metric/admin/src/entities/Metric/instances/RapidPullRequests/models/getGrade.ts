import { PullRequests } from "../../PullRequests";

export const getGrade = (data: PullRequests) => {
  const found = data.filter((item) => {
    if (!item.data.closed_at) return false;

    return (
      +new Date(item.data.closed_at) - +new Date(item.data.created_at) <
      1000 * 60 * 5
    );
  });

  return (1 - found.length / data.length) * 5;
};
