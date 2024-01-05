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
  Box,
} from "@strapi/design-system";
import ConfirmImport from "../../components/ConfirmImport";
import Marginer from "../../components/Marginer";
import { HalfWidthLargeScreen } from "./styles";
import FormSelect from "../../components/FormSelect";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={<ConfirmImport />}
        title="Form Import"
        subtitle={"Manually insert form results from backups"}
        as="h2"
      />
      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={8}
          paddingBottom={8}
          paddingLeft={7}
          paddingRight={7}
        >
          <Marginer vertical={20} />
          <Flex justifyContent="space-between">
            <HalfWidthLargeScreen>
              <FormSelect />
            </HalfWidthLargeScreen>
          </Flex>
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
