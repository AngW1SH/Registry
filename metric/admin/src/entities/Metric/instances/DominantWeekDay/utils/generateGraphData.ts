import { Commits } from "../../Commits";
import { Issues } from "../../Issues";
import { PullRequests } from "../../PullRequests";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const backgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 39, 100, 0.2)",
];

const borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 39, 100, 1)",
];

export const generateGraphData = (data: {
  commits: Commits;
  pullRequests: PullRequests;
  issues: Issues;
}): {
  label: string;
  data: number;
  backgroundColor: string;
  borderColor: string;
}[] => {
  const result = weekDays.map((day) => ({
    label: day,
    data: 0,
    backgroundColor: backgroundColors[weekDays.indexOf(day)],
    borderColor: borderColors[weekDays.indexOf(day)],
  }));

  data.commits.forEach((commit) => {
    if (!commit.data.commit.author?.date) return;

    const day = new Date(commit.data.commit.author.date).getDay();
    result[day].data += 1;
  });

  data.issues.forEach((iss) => {
    const day = new Date(iss.data.created_at).getDay();
    result[day].data += 1;

    if (iss.data.closed_at) {
      const day = new Date(iss.data.closed_at).getDay();
      result[day].data -= 1;
    }
  });

  data.pullRequests.forEach((pr) => {
    const day = new Date(pr.data.created_at).getDay();
    result[day].data += 1;

    if (pr.data.closed_at) {
      const day = new Date(pr.data.closed_at).getDay();
      result[day].data -= 1;
    }
  });

  return result;
};
