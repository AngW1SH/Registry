import { IMember } from "@/entities/Member/types";
import { IProjectDetailed } from "../types";

export const extractMembers = (data: IProjectDetailed): IMember[] => {
  return data.users;
};
