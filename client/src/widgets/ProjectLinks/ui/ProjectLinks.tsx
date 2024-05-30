import { IProjectLink, ProjectLinkIcon } from "@/entities/Project";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectLinksProps {
  links: IProjectLink[];
}

const ProjectLinks: FC<ProjectLinksProps> = ({ links }) => {
  return (
    <LabeledBlock label="Ссылки">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-full items-center gap-4"
        >
          <div className="max-h-[34px] min-h-[34px] min-w-[34px] max-w-[34px]">
            <ProjectLinkIcon name={link.platform} />
          </div>
          <span
            className="-mb-1 max-w-full overflow-hidden overflow-ellipsis"
            title={link.link}
          >
            {link.link}
          </span>
        </a>
      ))}
    </LabeledBlock>
  );
};

export default ProjectLinks;
