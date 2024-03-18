import { CommitsPerDay } from "../types/validate";

export const calculate = (data: CommitsPerDay) => {
  return data[data.length - 1]?.value || 0;
};
