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
  describe("getUnassignedByUser", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return a list of teams when everything is okay", async () => {
      const user = staticUser;

      const result = await teamRepository.getUnassignedByUser(user);

      expect(result).toBeDefined();
    });
  });

  describe("getUnassignedAdministratedByUser", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return a list of teams when everything is okay", async () => {
      const user = staticUser;

      const result = await teamRepository.getUnassignedAdministratedByUser(
        user
      );

      expect(result).toBeDefined();
    });
  });
});
