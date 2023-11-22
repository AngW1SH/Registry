import { useFetchClient } from "@strapi/helper-plugin";
import { ITeam } from "..";

export const generateTeams = async (teams: ITeam[]) => {
  const { post } = useFetchClient();
  const response = post("/team-builder/generate", {
    teams,
  });
};
