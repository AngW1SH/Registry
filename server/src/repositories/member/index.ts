import { strapi } from "@/db/strapi/client";
import {
  UserRoleStrapi,
  UserRoleStrapiList,
} from "@/db/strapi/types/user-role";
import { Member } from "@/entities/member";
import { ServerError } from "@/helpers/errors";

const memberRepositoryFactory = () => {
  return {
    edit,
  };

  async function edit(member: Member) {
    const role: UserRoleStrapiList = await strapi.get("user-roles/", {
      token: process.env.USER_TOKEN!,
      params: {
        filters: {
          name: member.role,
        },
        fields: ["id", "name"],
      },
    });

    if (!role || !role.data.length || !role.data[0]?.id)
      throw new ServerError("No such role found");

    const body = {
      data: {
        role: role.data[0].id,
      },
    };

    const result = await strapi.put("user-in-teams/" + member.id, {
      token: process.env.USER_TOKEN!,
      body,
    });

    if (!result) throw new ServerError("Couldn't update member");

    return result;
  }
};

const memberRepository = memberRepositoryFactory();

export default memberRepository;
