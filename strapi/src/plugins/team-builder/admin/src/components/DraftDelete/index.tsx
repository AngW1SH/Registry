import React, { FC, useState } from "react";

import {
  IconButton,
  Dialog,
  DialogBody,
  Flex,
  Typography,
  DialogFooter,
  Button,
} from "@strapi/design-system";
import { Trash } from "@strapi/icons";
import { useFetchClient } from "@strapi/helper-plugin";

interface DraftDeleteProps {
  id: number;
  onDelete?: (id: number) => void;
}

const DraftDelete: FC<DraftDeleteProps> = ({ id, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const { del } = useFetchClient();

  const handleShowPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  const fetchDraftDelete = async (id: number) => {
    const result = await del("/team-builder/draft/" + id);

    return result;
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await fetchDraftDelete(id);
    if (onDelete && result && result.status == 200) onDelete(id);
    setShowPopup(false);
  };

  return (
    <>
      <IconButton
        onClick={handleShowPopup}
        label="Delete"
        noBorder
        icon={<Trash />}
      />
      <Dialog
        onClose={() => setShowPopup(false)}
        title="Confirmation"
        isOpen={showPopup}
      >
        <DialogBody>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to delete this draft?
                <br />
                This action cannot be undone.
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

export default DraftDelete;
