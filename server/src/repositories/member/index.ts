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
    const roles: UserRoleStrapiList = member?.roles.length
      ? await strapi.get("user-roles/", {
          token: process.env.USER_TOKEN!,
          params: {
            filters: {
              name: {
                $in: member.roles,
              },
            },
            fields: ["id", "name"],
          },
        })
      : { data: [] };

    if (!roles) throw new ServerError("Couldn't fetch roles");

    const body = {
      data: {
        roles: roles.data.map((role) => role.id),
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
