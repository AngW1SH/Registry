import userRoleRepository from "@/repositories/user-role";

const userRoleServiceFactory = () => {
  return Object.freeze({
    findInFilters,
  });

  async function findInFilters(query?: string): Promise<string[]> {
    return userRoleRepository.findMany({ query, limit: 5 });
  }
};

const userRoleService = userRoleServiceFactory();

export default userRoleService;
