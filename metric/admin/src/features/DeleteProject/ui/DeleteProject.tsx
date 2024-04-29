import { useAppDispatch } from "@/app/store";
import { projectListSlice } from "@/composites/ProjectInList";
import { projectSlice } from "@/entities/Project";
import { useDeleteProjectMutation } from "@/entities/Project/model/projectApi";
import { TrashIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteProjectProps {
  projectId: string;
  className?: string;
}

const DeleteProject: FC<DeleteProjectProps> = ({ projectId, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteProject] = useDeleteProjectMutation();

  const handleConfirm = async () => {
    const result = await deleteProject(projectId);

    if (!result.hasOwnProperty("error")) {
      navigate("/");
      dispatch(projectSlice.actions.setProject(null));
      dispatch(projectListSlice.actions.deleteProject(projectId));
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "flex items-center whitespace-nowrap gap-3 bg-[#FFE7DF] border border-[#e3cecb] text-sm py-2 px-6 font-semibold rounded-lg " +
          className
        }
      >
        <TrashIcon width="16.82" height="18" />
        <span>Delete Project</span>
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 rounded-lg pb-11">
          <h2 className="font-bold text-2xl text-primary">Delete Project</h2>
          <p className="py-6">Are you sure you want to delete this project?</p>
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

export default DeleteProject;
