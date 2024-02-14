import { Button, Dropdown, FormInput } from "@/shared/ui";
import { FC, useState } from "react";
import { useAddProjectLinkMutation } from "../model/useAddProjectLinkMutation";

interface AddProjectLinkProps {
  projectId: string;
}

const AddProjectLink: FC<AddProjectLinkProps> = ({ projectId }) => {
  const [resource, setResource] = useState<string | null>(null);
  const [link, setLink] = useState<string>("");

  const { mutate: addLink } = useAddProjectLinkMutation();

  const handleSubmit = () => {
    if (resource && link) addLink({ projectId, resource, link });
    setResource(null);
    setLink("");
  };

  return (
    <form className="flex flex-wrap items-end">
      <Dropdown
        className="max-w-full sm:max-w-[46%] lg:max-w-[35%]"
        options={["Github", "Jira"]}
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
        onClick={handleSubmit}
      >
        Добавить
      </Button>
    </form>
  );
};

export default AddProjectLink;
