/*
 *
 * HomePage
 *
 */

import React from "react";

import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Flex,
  Box,
} from "@strapi/design-system";

import ProjectList from "../../components/ProjectList";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        title="TrackIT - Import"
        subtitle={"Track existing projects and get insights"}
        as="h2"
      />
      <ContentLayout>
        <ProjectList />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
