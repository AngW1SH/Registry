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

interface DraftGenerateProps {}

const DraftGenerate: FC<DraftGenerateProps> = () => {
  const { generateDraft } = useDraft();

  const [showPopup, setShowPopup] = useState(false);

  const handleConfirm = async () => {
    const isDone = await generateDraft();

    setShowPopup(false);
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
