import {
  Layout,
  ContentLayout,
  Flex,
  Divider,
  Box,
} from "@strapi/design-system";
import React, { FC, useState } from "react";
import DraftHeader from "../../components/DraftHeader";
import Marginer from "../../components/shared/Marginer";
import { HalfWidthLargeScreen } from "./styles";
import UserSelect from "../../components/UserSelect";
import FormSelect from "../../components/FormSelect";
import FormFieldSelect from "../../components/FormFieldSelect";
import AutoGenerate from "../../components/AutoGenerate";
import TeamList from "../../components/TeamList";

interface EditPageProps {
  pluginId: string;
}

const EditPage: FC<EditPageProps> = ({ pluginId }) => {
  const [form, setForm] = useState<string | null>(null);

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
