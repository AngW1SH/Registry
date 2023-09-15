import { ProjectCard } from "@/entities/Project";
import { TagList } from "@/entities/Tag";
import { GetActiveProjectsByTags } from "@/features/GetActiveProjectsByTags";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";

interface ActiveProjectsProps {}

const ActiveProjects: FC<ActiveProjectsProps> = () => {
  return (
    <div>
      <GetActiveProjectsByTags />
      <div className="pt-12" />
      <ul className="grid auto-rows-fr grid-cols-1 gap-5 lg:grid-cols-2">
        <li>
          <ProjectCard tags={<TagList className="justify-end" />} />
        </li>
        <li>
          <ProjectCard tags={<TagList className="justify-end" />} />
        </li>
      </ul>
      <div className="pt-7" />
      <LinkWithIcon href="/">Показать ещё</LinkWithIcon>
    </div>
  );
};

export default ActiveProjects;
