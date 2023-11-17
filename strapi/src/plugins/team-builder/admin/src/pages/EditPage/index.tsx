import { Layout } from "@strapi/design-system";
import React, { FC } from "react";
import DraftHeader from "../../components/DraftHeader";

interface EditPageProps {
  pluginId: string;
}

const EditPage: FC<EditPageProps> = ({ pluginId }) => {
  return (
    <Layout>
      <DraftHeader pluginId={pluginId} />
    </Layout>
  );
};

export default EditPage;
