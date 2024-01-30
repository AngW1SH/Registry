export const mergeUnique = <T extends { id: string | number }>(
  list1: T[] | null,
  list2: T[] | null
): T[] => {
  const result: T[] = [];

  const usedIds = new Set();

  list1 &&
    list1.forEach((team) => {
      usedIds.add(team.id);
      result.push(team);
    });

  list2 &&
    list2.forEach((team) => {
      if (!usedIds.has(team.id)) {
        usedIds.add(team.id);
        result.push(team);
      }
    });

  return result;
};
