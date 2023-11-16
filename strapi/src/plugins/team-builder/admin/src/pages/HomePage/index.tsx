/*
 *
 * HomePage
 *
 */

import React from "react";
import pluginId from "../../pluginId";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Button,
} from "@strapi/design-system";

import { Plus, Pencil } from "@strapi/icons";
import DraftList from "../../components/DraftList";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>}
        title="Team Drafts"
        subtitle="5 entries found"
        as="h2"
      />
      <ContentLayout>
        <DraftList />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
