export type SelectUserOptions = {
  populate: ("teams" | "projects")[];
};

export const selectUser = () => ({
  fields: ["id", "name", "phone"],
  populate: {
    services: {
      provider: true,
      value: true,
    },
  },
});

export const selectUserRole = () => ({
  fields: ["id", "name"],
});
