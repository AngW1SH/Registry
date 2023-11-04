import { IMember } from "@/entities/Member";
import { authorizedFetch } from "@/shared/utils";

export const fetchEditMember = async (member: IMember) => {
  const response = await authorizedFetch("/api/member", {
    method: "PUT",
    body: JSON.stringify({ member }),
  }).then((res) => {
    if (res.status !== 200) throw new Error("Failed to update a member");

    return res.status;
  });

  return response;
};
