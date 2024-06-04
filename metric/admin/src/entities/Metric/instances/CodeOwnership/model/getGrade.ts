import { CodeOwnershipData } from "../types";

/*
I've found literally 0 info about how to properly normalize dispersion,
so I had to come up with formulae myself based on the data I had
*/
export const getGrade = (data: CodeOwnershipData): number | null => {
  // I feel like it's fair to suspect that 0 lines doesn't mean the lack of work,
  // but rather a different line of work
  const filtered = data.items.filter((item) => item.lines > 0);

  if (filtered.length < 2) return null;

  // Get the percentage of lines owned by each user
  const normalized = filtered.map((item) => ({
    user: item.user,
    lines: item.lines / data.global.lines,
  }));

  // Calculate the average number of lines of code that a user should own
  const average = 1 / filtered.length;

  // The case where only one user contributed
  const worstCase =
    Math.pow(1 - average, 2) + (filtered.length - 1) * Math.pow(average, 2);

  // The actual case
  const dispersion = normalized.reduce((acc, cur) => {
    return acc + Math.pow(cur.lines - average, 2);
  }, 0);

  // The grade
  const result = (1 - Math.sqrt(dispersion / worstCase)) * 5;
  return Math.max(0, Math.min(5, result));
};
