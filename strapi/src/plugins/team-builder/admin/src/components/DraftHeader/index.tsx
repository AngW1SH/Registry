import React, { FC } from "react";
import { BaseHeaderLayout, Button, Link, Flex } from "@strapi/design-system";
import { ArrowLeft } from "@strapi/icons";
import Marginer from "../shared/Marginer";
import { useFetchClient } from "@strapi/helper-plugin";
import DraftSave from "../DraftSave";
import { useDraft } from "../../entities/Draft";
import DraftGenerate from "../DraftGenerate";

interface DraftHeaderProps {
  pluginId: string;
}

const DraftHeader: FC<DraftHeaderProps> = ({ pluginId }) => {
  const { draft } = useDraft();

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
          <DraftGenerate />
        </Flex>
      }
      title={draft?.name || ""}
      subtitle="API ID: draft"
      as="h2"
    />
  );
};

export default DraftHeader;
