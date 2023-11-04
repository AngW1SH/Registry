import { strapi } from "@/db/strapi/client";
import { Member } from "@/entities/member";

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
  }
};

const memberRepository = memberRepositoryFactory();

export default memberRepository;
