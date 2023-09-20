export const subscribe = async (email: string) => {
  console.log(email);
  const result = await fetch("api/subscribe").then((res) => res.status);

  return result;
};
