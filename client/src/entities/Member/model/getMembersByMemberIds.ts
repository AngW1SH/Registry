import { IMember } from "../types/types";

export const getMembersByMemberIds = (
  memberIds: number[],
  allMembers: IMember[],
) => {
  return memberIds.map((memberId) => {
    return allMembers.find((member) => member.id == memberId)!;
  });
};
