import type { IMember } from "./types/types";
import { getMembersByMemberIds } from "./model/getMembersByMemberIds";
import { staticMembers } from "./static/staticMembers";

export type { IMember };
export { getMembersByMemberIds, staticMembers };
