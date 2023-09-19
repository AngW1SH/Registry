"use client";
import { IProject, ProjectCard } from "@/entities/Project";
import { ITag, TagList, TagSlider } from "@/entities/Tag";
import { FC } from "react";

interface GetActiveProjectsByTagsProps {
  tags: ITag[];
  projects: IProject[];
}

const GetActiveProjectsByTags: FC<GetActiveProjectsByTagsProps> = async ({
  tags,
  projects,
}) => {
  return (
    <>
      <TagSlider tags={tags} />
      <div className="pt-12" />
      <ul className="grid auto-rows-fr grid-cols-1 gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <li>
            <ProjectCard
              project={project}
              tags={<TagList className="justify-end" />}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default GetActiveProjectsByTags;
