import { strapi } from "@/db/strapi/client";
import { Member } from "@/entities/member";
import { ServerError } from "@/helpers/errors";

const memberRepositoryFactory = () => {
  return {
    edit,
  };

  async function edit(member: Member) {
    const body = {
      data: {
        role: member.role,
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
