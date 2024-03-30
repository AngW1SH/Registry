import { IssueCompleteness } from "../types/validate";

export const calculate = (data: IssueCompleteness) => {
  return data[data.length - 1]?.data;
};
