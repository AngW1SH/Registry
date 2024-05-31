import userRoleRepository from "@/repositories/user-role";

const userRoleServiceFactory = () => {
  return Object.freeze({
    findInFilters,
    findExact,
  });

  async function findInFilters(query?: string): Promise<string[]> {
    return userRoleRepository.findMany({ query, limit: 5 });
  }

  async function findExact(roles: string[]): Promise<string[]> {
    return userRoleRepository.findManyExact(roles);
  }
};

const userRoleService = userRoleServiceFactory();

export default userRoleService;
