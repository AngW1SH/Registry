import {
  Layout,
  ContentLayout,
  Flex,
  Divider,
  Box,
} from "@strapi/design-system";
import React, { FC, useEffect, useState } from "react";
import DraftHeader from "../../components/DraftHeader";
import Marginer from "../../components/shared/Marginer";
import { HalfWidthLargeScreen } from "./styles";
import UserSelect from "../../components/UserSelect";
import FormSelect from "../../components/FormSelect";
import FormFieldSelect from "../../components/FormFieldSelect";
import AutoGenerate from "../../components/AutoGenerate";
import TeamList from "../../components/TeamList";
import { useParams } from "react-router-dom";
import { useFetchClient } from "@strapi/helper-plugin";
import { useDraftStore } from "../../entities/Draft/model/useDraftStore";
import { useFormStore } from "../../entities/Form/model";
import DraftNameEdit from "../../components/DraftNameEdit";
import { useDraft } from "../../entities/Draft";

interface EditPageProps {
  pluginId: string;
}

const EditPage: FC<EditPageProps> = ({ pluginId }) => {
  const params = useParams<{ id: string | undefined }>();

  const { initialize } = useDraft();

  useEffect(() => {
    if (params && params.id) initialize(+params.id);
  }, []);

  return (
    <Layout>
      <DraftHeader pluginId={pluginId} />
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
          <DraftNameEdit />
          <Marginer vertical={20} />
          <Flex justifyContent="space-between">
            <HalfWidthLargeScreen>
              <FormSelect />
            </HalfWidthLargeScreen>
            <HalfWidthLargeScreen>
              <UserSelect />
            </HalfWidthLargeScreen>
          </Flex>
          <Marginer vertical={25} />
          <Box padding={4}>
            <Divider />
          </Box>
          <Marginer vertical={25} />
          <AutoGenerate />
        </Box>
        <Marginer vertical={30} />
        <TeamList />
      </ContentLayout>
    </Layout>
  );
};

export default EditPage;
