import { Commits } from "../../Commits";

export const calculate = (
  data: Commits
): {
  average: number;
  median: number;
  mostChanged: { value: number; key: string }[];
} => {
  let dict = new Map<string, number>();

  data.forEach((commit) => {
    commit.data.files.forEach((file) => {
      if (!dict.has(file.filename)) {
        dict.set(file.filename, 0);
      }

      if (file.status === "added" || file.status === "removed") return;

      dict.set(file.filename, dict.get(file.filename)! + 1);
    });
  });

  const totalFiles = Array.from(dict.keys()).length;
  const changes: { value: number; key: string }[] = [];

  dict.forEach((value, key) => {
    changes.push({ value, key });
  });

  if (!changes.length) return { average: 0, median: 0, mostChanged: [] };

  changes.sort((a, b) => b.value - a.value);

  return {
    average: changes.reduce((a, b) => a + b.value, 0) / totalFiles,
    median: changes[Math.floor(totalFiles / 2)].value,
    mostChanged: changes.slice(0, 5).filter((item) => item.value),
  };
};
