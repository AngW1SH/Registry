import React, { FC, useState } from "react";
import {
  Flex,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@strapi/design-system";
import { ImportStatus, useFormStore } from "../../entities/Form";

interface ConfirmImportProps {}

const ConfirmImport: FC<ConfirmImportProps> = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { form, results, selected, setResults } = useFormStore();

  const handleConfirm = async () => {
    const result = await Promise.allSettled(
      results
        .filter((_, index) => selected.includes(index))
        .map((response) => {
          return fetch(process.env.SERVER_URL + "/user/form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              form: {
                id: form?.formId,
              },
              response: {
                data: response.value,
              },
            }),
          });
        })
    );

    const statuses = result.map(
      (result) => result.status == "fulfilled" && result.value.ok
    );

    const selectedResults = results.filter((_, index) =>
      selected.includes(index)
    );

    const updatedResults = results.map((result, index) => {
      const indexInSelected = selected.findIndex((mapped) => mapped == index);

      if (indexInSelected == -1) return result;

      return {
        ...result,
        status: statuses[indexInSelected]
          ? ImportStatus.fulfilled
          : ImportStatus.rejected,
      };
    });

    setResults(updatedResults);
    setShowPopup(false);
  };

  return (
    <>
      <Button onClick={() => setShowPopup(true)}>Confirm Import</Button>
      <Dialog
        onClose={() => setShowPopup(false)}
        title="Confirmation"
        isOpen={showPopup}
      >
        <DialogBody>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to confirm import?
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

export default ConfirmImport;
