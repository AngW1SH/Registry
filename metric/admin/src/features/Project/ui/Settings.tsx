import { useAppDispatch } from "@/app/store";
import { IProject, projectSlice } from "@/entities/Project";
import { useUpdateProjectMutation } from "@/entities/Project/model/projectApi";
import { GearIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useState } from "react";

interface SettingsProps {
  project: IProject;
}

const Settings: FC<SettingsProps> = ({ project }) => {
  const [hasChanged, setHasChanged] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [update] = useUpdateProjectMutation();

  const dispatch = useAppDispatch();

  // update locally until saved for performance reasons (store updates are visibly slow)
  const [projectLocal, setProjectLocal] = useState(project);

  // Triggers when the user changes a field, only updates the local state
  const updateField = (key: keyof IProject, value: string) => {
    setProjectLocal({ ...projectLocal, [key]: value });
    setHasChanged(true);
  };

  // Triggers when the user presses the 'confirm' button
  // Makes a request to the server and updates the store
  const handleConfirm = async () => {
    const result = await update(projectLocal);

    if (!result.hasOwnProperty("error")) {
      dispatch(projectSlice.actions.setProject(projectLocal));
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "flex gap-3 items-center bg-[#e9edf8] font-semibold border border-[#e2e7f5] rounded-lg whitespace-nowrap py-2 px-6 text-sm"
        }
      >
        <GearIcon width="23.876" height="23.878" />
        <span>Configure Project</span>
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 px-[10%] rounded-lg pb-11">
          <h2 className="font-bold text-3xl text-primary pb-10">
            Rename Project
          </h2>
          <TextInput
            label="Name"
            value={projectLocal.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <div className="pt-6" />
          <TextInput
            label="Description"
            value={projectLocal.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
          <div className="pt-6" />
          <div className="flex [&>*]:flex-1 gap-10 justify-between">
            <TextInput
              label="Start Date"
              type="date"
              value={
                projectLocal.dateStart
                  ? new Date(projectLocal.dateStart).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => updateField("dateStart", e.target.value)}
            />
            <TextInput
              label="End Date"
              type="date"
              value={
                projectLocal.dateEnd
                  ? new Date(projectLocal.dateEnd).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => updateField("dateEnd", e.target.value)}
            />
          </div>
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
                (hasChanged
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

export default Settings;
