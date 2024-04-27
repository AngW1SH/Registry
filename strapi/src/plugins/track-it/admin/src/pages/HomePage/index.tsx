/*
 *
 * HomePage
 *
 */

import React, { useEffect } from "react";

import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Flex,
  Box,
} from "@strapi/design-system";

import ProjectList from "../../components/ProjectList";
import FilterText from "../../components/FilterText";
import Marginer from "../../components/Marginer";
import { useProjectStore } from "../../entities/Project";

const HomePage = () => {
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <BaseHeaderLayout
        title="TrackIT - Import"
        subtitle={"Track existing projects and get insights"}
        as="h2"
      />
      <ContentLayout>
        <FilterText />
        <Marginer vertical={30} />
        <ProjectList />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
