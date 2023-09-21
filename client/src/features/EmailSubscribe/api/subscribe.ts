export const subscribe = async (email: string) => {
  const result = await fetch("api/subscribe").then((res) => res.status);

  return result;
};
