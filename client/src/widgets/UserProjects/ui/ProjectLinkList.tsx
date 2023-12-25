import { UserProject } from "@/composites/ProjectInspect";
import { DeleteProjectLink } from "@/features/EditProject";
import { Button, Dropdown, FormInput } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface ProjectLinkListProps {
  project: UserProject;
}

const ProjectLinkList: FC<ProjectLinkListProps> = ({ project }) => {
  return (
    <div>
      <h2 className="text-sm text-[#898989]">Ссылки на ресурсы</h2>
      <div className="pt-3" />
      <div className="rounded-lg border border-[#898989] p-5">
        <h2 className="text-sm text-[#898989]">Новый ресурс</h2>
        <div className="pt-3" />
        <div className="flex items-end">
          <Dropdown
            className="w-[35%]"
            options={["A", "B"]}
            value={""}
            placeholder="Название ресурса"
            onChange={() => {}}
            namePrefix={"resource-" + project.id}
          />
          <FormInput className="ml-8 w-[35%]" placeholder="Ссылка на ресурс" />
          <Button className="ml-auto px-10">Добавить</Button>
        </div>
      </div>
      <div className="pt-6" />
      <div className="relative flex border-t border-[#b7b7b7] py-4 pr-12 last:border-b">
        <p className="w-1/5">Github</p>
        <p className="max-w-[calc(80%-50px)] text-ellipsis">
          <Link href="https://github.com/AngW1SH/Registry">
            https://github.com/AngW1SH/Registry
          </Link>
        </p>
        <DeleteProjectLink
          projectId={1}
          linkId={1}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default ProjectLinkList;
