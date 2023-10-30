import { staticTeamListStrapiPopulatedWithAdministrators } from "@/entities/team/static/staticTeams";
import teamRepository from "..";
import { staticUser } from "@/entities/user";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () =>
      Promise.resolve(staticTeamListStrapiPopulatedWithAdministrators),
  })
) as jest.Mock;

describe("Team Repository", () => {
  describe("getUnassigned", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return a list of teams when everything is okay", async () => {
      const user = staticUser;

      const result = await teamRepository.getUnassigned(user.id);

      expect(result).toBeDefined();
    });
  });

  describe("getUnassignedAdministrated", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return a list of teams when everything is okay", async () => {
      const user = staticUser;

      const result = await teamRepository.getUnassignedAdministrated(user.id);

      expect(result).toBeDefined();
    });
  });
});
