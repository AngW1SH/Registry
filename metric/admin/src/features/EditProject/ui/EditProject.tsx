import { useAppDispatch } from "@/app/store";
import { IProject, projectSlice } from "@/entities/Project";
import { useUpdateProjectMutation } from "@/entities/Project/model/projectApi";
import { SettingsIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useState } from "react";

interface EditProjectProps {
  project: IProject;
}

const EditProject: FC<EditProjectProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [update] = useUpdateProjectMutation();

  const dispatch = useAppDispatch();

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const handleConfirm = async () => {
    const result = await update({
      ...project,
      name,
      description,
    });

    if (!result.hasOwnProperty("error")) {
      dispatch(
        projectSlice.actions.setProject({ ...project, name, description })
      );
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 rounded-lg p-2 bg-white text-[#444]"
      >
        <SettingsIcon />
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 px-[10%] rounded-lg pb-11">
          <h2 className="font-bold text-3xl text-primary pb-10">
            Rename Project
          </h2>
          <TextInput
            label="New Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="pt-6" />
          <TextInput
            label="New Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-center gap-10 pt-10">
            <button
              onClick={() => setIsOpen(false)}
              className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={
                "py-3 px-14 font-medium rounded-lg " +
                (name !== project.name || description !== project.description
                  ? "bg-[#551FFF] text-[#F3F0FF]"
                  : "text-black bg-[#E5E5E5]")
              }
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditProject;
