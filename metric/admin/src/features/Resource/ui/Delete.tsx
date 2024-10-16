import { useAppDispatch } from "@/app/store";
import { resourceSlice } from "@/entities/Resource";
import { useDeleteResourceMutation } from "@/entities/Resource/model/resourceApi";
import { TrashIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { FC, useState } from "react";

interface DeleteProps {
  id: string;
  className?: string;
}

const Delete: FC<DeleteProps> = ({ id, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [deleteResource] = useDeleteResourceMutation();

  const handleConfirm = async () => {
    const result = await deleteResource(id);

    // Update store on successful deletion
    if (!result.hasOwnProperty("error")) {
      dispatch(resourceSlice.actions.popResource(id));
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "flex items-center whitespace-nowrap gap-3 bg-[#FFE7DF] border border-[#e3cecb] text-sm py-2 px-4 font-semibold rounded-lg " +
          className
        }
      >
        <TrashIcon width="16.82" height="18" />
        <span>Delete Resource</span>
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 rounded-lg pb-11">
          <h2 className="font-bold text-2xl text-primary">Delete Resource</h2>
          <p className="py-6">Are you sure you want to delete this Resource?</p>
          <div className="flex justify-center gap-10">
            <button
              onClick={() => setIsOpen(false)}
              className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="py-3 px-14 bg-[#FFE7DF] font-medium text-[#BC2F26] rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Delete;
