/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Flex,
  Loader,
} from "@strapi/design-system";

import DraftList from "../../components/DraftList";
import { useFetchClient } from "@strapi/helper-plugin";
import { IDraftInList } from "../../entities/Draft/types";
import DraftCreate from "../../components/DraftCreate";
import { useDraft } from "../../entities/Draft";

const HomePage = () => {
  const { get } = useFetchClient();

  const { setDraft } = useDraft();

  const [drafts, setDrafts] = useState<IDraftInList[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDraft(null);
    getDrafts();
  }, []);

  async function getDrafts() {
    setIsLoading(true);
    const response = await get("/team-builder/draft");

    if (response.status == 200 && response.data) setDrafts(response.data);
    setIsLoading(false);
  }

  useEffect(() => {}, []);

  if (isLoading)
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" height="90vh">
          <Loader>Loading content...</Loader>
        </Flex>
      </Layout>
    );

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
