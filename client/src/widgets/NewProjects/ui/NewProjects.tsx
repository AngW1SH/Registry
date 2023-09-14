import { ProjectCardAlt } from "@/entities/Project";
import { TagList } from "@/entities/Tag";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";

interface NewProjectsProps {}

const NewProjects: FC<NewProjectsProps> = () => {
  return (
    <>
      <ul className="grid auto-rows-fr grid-cols-3 gap-y-5">
        <li className="col-span-1 row-span-1">
          <ProjectCardAlt tags={<TagList />} />
        </li>
        <li className="col-span-1 row-span-1">
          <ProjectCardAlt tags={<TagList />} />
        </li>
        <li className="col-span-1 row-span-1">
          <ProjectCardAlt className="border-r-0" tags={<TagList />} />
        </li>
        <li className="col-span-1 row-span-1">
          <ProjectCardAlt tags={<TagList />} />
        </li>
        <li className="col-span-1 row-span-1">
          <ProjectCardAlt tags={<TagList />} />
        </li>
        <li className="col-span-1 row-span-1">
          <ProjectCardAlt className="border-r-0" tags={<TagList />} />
        </li>
      </ul>
      <div className="pt-6" />
      <LinkWithIcon href="/" className="font-medium" iconSize={10}>
        Показать ещё
      </LinkWithIcon>
    </>
  );
};

export default NewProjects;
