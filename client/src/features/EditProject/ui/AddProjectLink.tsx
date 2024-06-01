import { Button, Dropdown, FormInput } from "@/shared/ui";
import { FC, useEffect, useState } from "react";
import { useAddProjectLinkMutation } from "../model/useAddProjectLinkMutation";

interface AddProjectLinkProps {
  projectId: string;
}

const AddProjectLink: FC<AddProjectLinkProps> = ({ projectId }) => {
  const [resource, setResource] = useState<string | null>(null);
  const [link, setLink] = useState<string>("");

  const { mutate: addLink, isLoading, data } = useAddProjectLinkMutation();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (resource && link) addLink({ projectId, resource, link });
  };

  useEffect(() => {
    if (data) {
      setResource(null);
      setLink("");
    }
  }, [data]);

  return (
    <form className="flex flex-wrap items-end">
      <Dropdown
        className="max-w-full sm:max-w-[46%] lg:max-w-[35%]"
        options={["Github"]} // TODO: fetch options from the server
        value={resource}
        placeholder="Название ресурса"
        onChange={setResource}
        namePrefix={"resource-" + projectId}
      />
      <FormInput
        value={link}
        onChange={setLink}
        className="mt-5 w-full max-w-full sm:ml-8 sm:mt-0 sm:w-[46%] sm:max-w-[46%] lg:w-[35%] lg:max-w-[35%]"
        placeholder="Ссылка на ресурс"
      />
      <Button
        type="submit"
        className="mt-4 px-10 lg:ml-auto lg:mt-0"
        style={{
          backgroundColor: isLoading ? "#b7b7b7" : undefined,
          color: isLoading ? "black" : undefined,
        }}
        onClick={handleSubmit}
      >
        {!isLoading && "Добавить"}
        {isLoading && "Добавление..."}
      </Button>
    </form>
  );
};

export default AddProjectLink;
