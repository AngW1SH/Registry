import React, { FC } from "react";
import { BaseHeaderLayout, Button, Link, Flex } from "@strapi/design-system";
import { Plus, ArrowLeft, Pencil } from "@strapi/icons";
import Marginer from "../shared/Marginer";
import { useDraftTeamsStore } from "../../entities/Team/model";
import { useFetchClient } from "@strapi/helper-plugin";
import { ITeam } from "../../entities/Team";
import { useDraftStore } from "../../entities/Draft/model/useDraftStore";
import DraftSave from "../DraftSave";

interface DraftHeaderProps {
  pluginId: string;
}

const DraftHeader: FC<DraftHeaderProps> = ({ pluginId }) => {
  const { teams } = useDraftTeamsStore();
  const { post } = useFetchClient();
  const { active } = useDraftStore();

  const generateTeams = async (teams: ITeam[]) => {
    const response = await post("/team-builder/generate", {
      teams,
    });
  };

  return (
    <BaseHeaderLayout
      navigationAction={
        <Link startIcon={<ArrowLeft />} to={"/plugins/" + pluginId}>
          Go back
        </Link>
      }
      primaryAction={
        <Flex>
          <DraftSave />
          <Marginer horizontal={20} />
          <Button onClick={() => generateTeams(teams)}>Generate Teams</Button>
        </Flex>
      }
      title={active?.name || ""}
      subtitle="API ID: draft"
      as="h2"
    />
  );
};

export default DraftHeader;
