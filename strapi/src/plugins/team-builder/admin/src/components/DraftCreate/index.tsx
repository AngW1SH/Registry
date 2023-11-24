import React, { FC } from "react";

import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { useFetchClient } from "@strapi/helper-plugin";
import { useHistory } from "react-router-dom";

interface DraftCreateProps {}

const DraftCreate: FC<DraftCreateProps> = () => {
  const { post } = useFetchClient();
  const history = useHistory();

  async function createDraft() {
    const response = await post("/team-builder/create");

    console.log(response);

    if (response.status == 200) {
      history.push("/plugins/team-builder/" + response.data.id);
    }
  }

  return (
    <Button onClick={createDraft} startIcon={<Plus />}>
      Add an entry
    </Button>
  );
};

export default DraftCreate;
