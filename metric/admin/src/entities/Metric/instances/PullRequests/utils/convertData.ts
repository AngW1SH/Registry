import { PullRequests, PullRequestsSchema } from "../types";

export const convertData = (data: any): PullRequests => {
  const converted = PullRequestsSchema.safeParse(data);

  if (!converted.success) {
    console.log(converted.error.message);
    return [];
  }

  return converted.data;
};
