import { Commits } from "../../Commits";

export const getGrade = (
  result: number,
  data: Commits,
  calendar: { start: string | null; end: string | null },
  userCount: number
) => {
  let start = calendar.start ? new Date(calendar.start) : new Date();

  let end = calendar.end ? new Date(calendar.end) : new Date("1970-01-01");

  data.forEach((item) => {
    if (!item.data.commit.author) return;
    const commitDate = new Date(item.data.commit.author.date);

    if (commitDate < start) start = commitDate;
    if (commitDate > end) end = commitDate;
  });

  const dayCount = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const commitsPerDay = result / dayCount / userCount;

  return +Math.min(commitsPerDay * 5 * 3, 5).toFixed(2); // 3 commits per day and more is the best grade
};
