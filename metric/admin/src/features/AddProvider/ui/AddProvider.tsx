import { GitLabIcon, GithubIcon, XCircleIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useState } from "react";
import ProviderSelect from "./ProviderSelect";
import { PlatformName } from "@/entities/Platform/types";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchAddResource } from "../api/fetchAddProvider";
import { resourceSlice } from "@/entities/Resource";

interface AddProviderProps {
  className?: string;
}

const options = [
  {
    name: PlatformName.GitHub,
    icon: <GithubIcon />,
  },
  {
    name: PlatformName.GitLab,
    icon: <GitLabIcon />,
  },
];

const AddProvider: FC<AddProviderProps> = ({ className = "" }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [provider, setProvider] = useState<string | null>(null);

  const platforms = useAppSelector((state) => state.platform.platforms);
  const project = useAppSelector((state) => state.project.project);
  const dispatch = useAppDispatch();

  const handleConfirm = async () => {
    if (name && provider && project) {
      const platform = platforms.find((platform) => platform.name === provider);

      if (!platform) throw new Error("Couldn't find platform");

      const result = await fetchAddResource(name, platform.id, project.id);

      if (!result) throw new Error("Couldn't create a resource");

      setName("");
      setProvider(null);

      dispatch(resourceSlice.actions.addResource(result));

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
        Add a New Provider
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
            Add Provider
          </h2>
          <div className="pt-12"></div>
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the provider name"
          />
          <div className="pt-10"></div>
          <ProviderSelect
            options={options}
            selected={provider}
            onSelect={setProvider}
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

export default AddProvider;
