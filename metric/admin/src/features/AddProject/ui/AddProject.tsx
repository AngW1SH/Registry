import { XCircleIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddProject } from "../api/fetchAddProject";

interface AddProjectProps {
  className?: string;
}

const AddProject: FC<AddProjectProps> = ({ className }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const handleConfirm = async () => {
    if (name) {
      const result = await fetchAddProject(name);

      if (result) navigate(`/project/${result.id}`);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "bg-background flex text-xl justify-center rounded-lg py-4 text-[#A3AED0] font-medium " +
          className
        }
      >
        Add a New Project
      </button>
      <Modal show={open} onClose={() => setOpen(false)}>
        <div className="bg-white relative pt-7 w-1/2 rounded-lg pb-11 px-7">
          <div
            className="cursor-pointer absolute top-5 right-5 h-10 w-10"
            onClick={() => setOpen(false)}
          >
            <XCircleIcon />
          </div>
          <h2 className="text-3xl text-[#A3AED0] text-center font-medium">
            Add Project
          </h2>
          <div className="pt-12"></div>
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the provider name"
          />
          <div className="pt-14"></div>
          <button
            onClick={handleConfirm}
            className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddProject;
