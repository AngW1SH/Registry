import { Button, Dropdown, FormInput } from "@/shared/ui";
import { FC, useState } from "react";
import { useAddProjectLinkMutation } from "../model/useAddProjectLinkMutation";

interface AddProjectLinkProps {
  projectId: number;
}

const AddProjectLink: FC<AddProjectLinkProps> = ({ projectId }) => {
  const [resource, setResource] = useState<string | null>(null);
  const [link, setLink] = useState<string>("");

  const { mutate: addLink } = useAddProjectLinkMutation();

  const handleSubmit = () => {
    if (resource && link) addLink({ projectId, resource, link });
  };

  return (
    <div className="flex items-end">
      <Dropdown
        className="max-w-[35%]"
        options={["Github", "Jira"]}
        value={resource}
        placeholder="Название ресурса"
        onChange={setResource}
        namePrefix={"resource-" + projectId}
      />
      <FormInput
        value={link}
        onChange={setLink}
        className="ml-8 w-[35%] max-w-[35%]"
        placeholder="Ссылка на ресурс"
      />
      <Button className="ml-auto px-10" onClick={handleSubmit}>
        Добавить
      </Button>
    </div>
  );
};

export default AddProjectLink;
