import { IUser, IUserWithRole } from "../types/types";

/*
The function assumes allUsers contains all the users with userIds of the first argument
*/
export const getUsersByUserIds = (userIds: number[], allUsers: IUser[]) => {
  return userIds.map((userId) => {
    return allUsers.find((user) => user.id == userId)!;
  });
};

export const getUsersWithRolesByUserIds = (
  userIds: number[],
  allUsers: IUserWithRole[],
) => {
  return userIds.map((userId) => {
    return allUsers.find((user) => user.id == userId)!;
  });
};
