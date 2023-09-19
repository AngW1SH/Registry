import { ProjectCardAlt } from "@/entities/Project";
import { TagList, staticTags } from "@/entities/Tag";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";
import { staticProjects } from "../static/staticProjects";

interface NewProjectsProps {}

const NewProjects: FC<NewProjectsProps> = () => {
  return (
    <>
      <ul className="grid auto-rows-fr grid-cols-1 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:nth-child(2n)]:border-r-0 lg:[&>li:nth-child(2n)]:border-r lg:[&>li:nth-child(3n)]:border-r-0 [&>li]:border-x-0  sm:[&>li]:border-r">
        {staticProjects.map((project) => (
          <li className="col-span-1 row-span-1 border-t border-black p-3">
            <ProjectCardAlt
              project={project}
              tags={<TagList tags={staticTags.slice(0, 2)} />}
            />
          </li>
        ))}
      </ul>
      <div className="pt-6" />
      <LinkWithIcon href="/" className="font-medium" iconSize={10}>
        Показать ещё
      </LinkWithIcon>
    </>
  );
};

export default NewProjects;
