import { Commits } from "../types";

export const extractUsers = (data: Commits) => {
  const users = new Set<string>();

  data.forEach((item) => {
    if (item.data.author?.login && !users.has(item.data.author.login))
      users.add(item.data.author.login);
  });

  return Array.from(users);
};
