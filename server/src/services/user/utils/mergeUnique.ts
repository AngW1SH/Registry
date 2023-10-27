export const mergeUnique = <T extends { id: number }>(
  list1: T[],
  list2: T[]
): T[] => {
  const result: T[] = [];

  const usedIds = new Set();

  list1.forEach((team) => {
    usedIds.add(team.id);
    result.push(team);
  });

  list2.forEach((team) => {
    if (!usedIds.has(team.id)) {
      usedIds.add(team.id);
      result.push(team);
    }
  });

  return result;
};
