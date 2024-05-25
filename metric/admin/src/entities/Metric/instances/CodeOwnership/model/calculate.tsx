import { Commits } from "../../Commits";
import { CodeOwnershipData } from "../types";

export const calculate = (commits: Commits): CodeOwnershipData => {
  const data: CodeOwnershipData = {
    global: {
      lines: 0,
    },
    items: [],
    majority: {
      users: [],
      lines: 0,
    },
  };

  const userData = new Map<string, number>();

  commits.forEach((commit) => {
    if (!commit.data.author?.login) return;

    if (!userData.has(commit.data.author.login)) {
      userData.set(commit.data.author.login, 0);
    }

    const keys = ["additions", "deletions", "changes"] as const;

    commit.data.files.forEach((file) => {
      keys.forEach((key) => {
        if (!file[key]) return;

        userData.set(
          commit.data.author!.login,
          userData.get(commit.data.author!.login)! + file[key]
        );

        data.global.lines += file[key];
      });
    });
  });

  userData.forEach((value, key) => {
    data.items.push({
      user: key,
      lines: value,
    });
  });

  // sort by number of lines
  data.items.sort((a, b) => b.lines - a.lines);

  data.items.forEach((item) => {
    if (data.majority.lines < data.global.lines / 2) {
      data.majority.lines += item.lines;
      data.majority.users.push(item.user);
    }
  });

  return data;
};
