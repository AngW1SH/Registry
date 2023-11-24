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
import DraftCreate from "../../components/DraftCreate";

const HomePage = () => {
  const { post } = useFetchClient();

  const [drafts, setDrafts] = useState<IDraftInList[]>([]);

  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={<DraftCreate />}
        title="Team Drafts"
        subtitle={drafts.length + " entries found"}
        as="h2"
      />
      <ContentLayout>
        <DraftList drafts={drafts} setDrafts={setDrafts} />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
