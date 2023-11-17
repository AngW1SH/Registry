import React, { FC } from "react";
import { BaseHeaderLayout, Button, Link, Flex } from "@strapi/design-system";
import { Plus, ArrowLeft, Pencil } from "@strapi/icons";
import Marginer from "../shared/Marginer";

interface DraftHeaderProps {
  pluginId: string;
}

const DraftHeader: FC<DraftHeaderProps> = ({ pluginId }) => {
  return (
    <BaseHeaderLayout
      navigationAction={
        <Link startIcon={<ArrowLeft />} to={"/plugins/" + pluginId}>
          Go back
        </Link>
      }
      primaryAction={
        <Flex>
          <Button variant="secondary">Save Draft</Button>
          <Marginer horizontal={20} />
          <Button>Generate Teams</Button>
        </Flex>
      }
      secondaryAction={
        <Button variant="tertiary" startIcon={<Pencil />}>
          Edit title
        </Button>
      }
      title="ПМИ осень 2023"
      subtitle="API ID: draft"
      as="h2"
    />
  );
};

export default DraftHeader;
