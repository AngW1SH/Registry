import { useCreateProjectMutation } from "@/entities/Project/model/projectApi";
import { PlusCircleIcon, XCircleIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateProps {
  className?: string;
}

const Create: FC<CreateProps> = ({ className }) => {
  const navigate = useNavigate();

  const [create, { data: createData }] = useCreateProjectMutation();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  // Make a request
  const handleConfirm = async () => {
    if (name) {
      await create(name);
    }
  };

  // Updating the store is not needed here
  // The new project data will be gathered on visiting the newly created project's page
  useEffect(() => {
    if (createData && createData.id) {
      navigate(import.meta.env.VITE_BASE_PATH + `project/${createData.id}`);
      setOpen(false);
    }
  }, [createData]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "bg-[#effbd7] border border-[#e3efcb] text-black px-8 flex text-xl gap-3 justify-center rounded-lg py-4 " +
          className
        }
      >
        <PlusCircleIcon height={27} width={27} />
        <span className="font-bold">New Project</span>
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

export default Create;
