/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import pluginId from "../../pluginId";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Button,
} from "@strapi/design-system";

import { Plus, Pencil } from "@strapi/icons";
import DraftList from "../../components/DraftList";
import { useFetchClient } from "@strapi/helper-plugin";
import { IDraftInList } from "../../entities/Draft/types";

const HomePage = () => {
  const { get, post } = useFetchClient();

  const [drafts, setDrafts] = useState<IDraftInList[]>([]);

  async function createDraft() {
    const response = await post("/team-builder/create");
  }

  async function getDrafts() {
    const response = await get("/team-builder/draft");

    if (response.status == 200 && response.data) setDrafts(response.data);
  }

  useEffect(() => {
    getDrafts();
  }, []);

  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={
          <Button onClick={createDraft} startIcon={<Plus />}>
            Add an entry
          </Button>
        }
        title="Team Drafts"
        subtitle="5 entries found"
        as="h2"
      />
      <ContentLayout>
        <DraftList drafts={drafts} />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
