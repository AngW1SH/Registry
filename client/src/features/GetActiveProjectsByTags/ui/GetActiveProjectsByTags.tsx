"use client";
import { IProject, ProjectCard } from "@/entities/Project";
import { ITag, TagList, TagSlider } from "@/entities/Tag";
import { FC } from "react";

interface GetActiveProjectsByTagsProps {
  tags: ITag[];
  projects: IProject[];
}

/*
General rerender idea
Create an API request that will return a {projects, tags} object,
where tags are all the tags that are used in at least one of the projects of the projects property
merge those tags with the already existing ones
Each project will have a tagList: string[] property, containing tag IDs
Locally transform tag ID array into Tag array and pass it to the <TagList /> component

Same for initial props, just export that API and use it in the widget
*/

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
              className="h-full"
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
