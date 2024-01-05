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
  Flex,
  Loader,
} from "@strapi/design-system";
import ConfirmImport from "../../components/ConfirmImport";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={<ConfirmImport />}
        title="Form Import"
        subtitle={"Manually insert form results from backups"}
        as="h2"
      />
      <ContentLayout>456</ContentLayout>
    </Layout>
  );
};

export default HomePage;
