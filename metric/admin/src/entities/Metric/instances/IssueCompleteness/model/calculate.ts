import { IssueCompleteness } from "../types/validate";

export const calculate = (data: IssueCompleteness) => {
  if (!data.length) return { completed: 0, total: 0 };
  return data[data.length - 1]?.data;
};
