import { Member } from "@/entities/member";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { User } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import memberRepository from "@/repositories/member";
import teamRepository from "@/repositories/team";

const memberServiceFactory = () => {
  return {
    edit,
  };

  async function edit(member: Member, user: User) {
    const teamResult = await teamRepository.findOne({ member: member.id });
    if (!teamResult) throw new ServerError("Couldn't find the member's team");

    const team = teamResult.teams[0];

    if (
      team.hasOwnProperty("administrators") &&
      (team as TeamWithAdministrators).administrators.includes(user.id)
    ) {
      return memberRepository.edit(member);
    }

    if (
      !member.user ||
      member.user != user.id ||
      !team.members.includes(member.id)
    )
      throw new UnauthorizedError(
        "Current user not allowed to edit this team member"
      );

    return memberRepository.edit(member);
  }
};

const memberService = memberServiceFactory();

export default memberService;
