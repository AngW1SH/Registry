import { UserProject } from "@/composites/ProjectInspect";
import { AddProjectLink, DeleteProjectLink } from "@/features/EditProject";
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
        <AddProjectLink projectId={project.id} />
      </div>
      <div className="pt-6" />
      <ul>
        {project.links.map((link) => (
          <li
            key={link.id}
            className="relative flex border-t border-[#b7b7b7] py-4 pr-12 last:border-b"
          >
            <p className="w-1/5">{link.platform}</p>
            <p className="max-w-[calc(80%-50px)] text-ellipsis">
              <Link href={link.link}>{link.link}</Link>
            </p>
            <DeleteProjectLink
              projectId={1}
              linkId={1}
              className="absolute right-0 top-1/2 -translate-y-1/2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectLinkList;
