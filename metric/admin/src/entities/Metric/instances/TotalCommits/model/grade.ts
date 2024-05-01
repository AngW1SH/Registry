import { Commits } from "../../Commits";

export const getGrade = (
  result: number,
  data: Commits,
  calendar: { start: string | null; end: string | null }
) => {
  let start = calendar.start ? new Date(calendar.start) : new Date();

  let end = calendar.end ? new Date(calendar.end) : new Date("1970-01-01");

  data.forEach((item) => {
    const commitDate = new Date(item.data.commit.author.date);
    if (commitDate < start) start = commitDate;
  });

  data.forEach((item) => {
    const commitDate = new Date(item.data.commit.author.date);
    if (commitDate > end) end = commitDate;
  });

  const dayCount = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const commitsPerDay = result / dayCount;

  return +Math.min((commitsPerDay * 5) / 4, 5).toFixed(2); // 3 commits per day and more is the best grade
};
