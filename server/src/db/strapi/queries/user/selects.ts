export type SelectUserOptions = {
  populate: ("teams" | "projects")[];
};

export const selectUser = () => ({
  fields: ["id", "name", "email"],
});
