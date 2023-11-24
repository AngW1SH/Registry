import React, { FC, useState } from "react";

import {
  Flex,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@strapi/design-system";
import { useDraft } from "../../entities/Draft";
import { useFetchClient } from "@strapi/helper-plugin";
import { useHistory } from "react-router-dom";

interface DraftGenerateProps {}

const DraftGenerate: FC<DraftGenerateProps> = () => {
  const { draft, generateDraft } = useDraft();
  const history = useHistory();

  const { del } = useFetchClient();

  const [showPopup, setShowPopup] = useState(false);

  const fetchDraftDelete = async (id: number) => {
    const result = await del("/team-builder/draft/" + id);

    return result.status;
  };

  const handleConfirm = async () => {
    const isDone = await generateDraft();
    setShowPopup(false);

    if (isDone == 200) {
      const deleteStatus = draft ? await fetchDraftDelete(draft.id) : 400;
      if (deleteStatus == 200) history.push("/plugins/team-builder");
    }
  };

  return (
    <>
      <Button onClick={() => setShowPopup(true)}>Generate Teams</Button>
      <Dialog
        onClose={() => setShowPopup(false)}
        title="Confirmation"
        isOpen={showPopup}
      >
        <DialogBody>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to generate teams?
                <br />
                This action cannot be undone. Please check all the data to be
                correct.
              </Typography>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setShowPopup(false)} variant="tertiary">
              Cancel
            </Button>
          }
          endAction={<Button onClick={handleConfirm}>Confirm</Button>}
        />
      </Dialog>
    </>
  );
};

export default DraftGenerate;
