"use client";
import { ProjectCard } from "@/entities/Project";
import { ITag, TagList, TagSlider, getTagsByTagIds } from "@/entities/Tag";
import { FC, useState } from "react";
import useActiveProjectsQuery from "../model/useActiveProjectsQuery";
import {
  IProjectsWithTags,
  ProjectsWithTagsList,
} from "@/composites/ProjectsWithTags";

interface GetActiveProjectsByTagsProps {
  initialProjectsWithTags: IProjectsWithTags;
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

const GetActiveProjectsByTags: FC<GetActiveProjectsByTagsProps> = ({
  initialProjectsWithTags,
}) => {
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const { data: projectData } = useActiveProjectsQuery(
    selectedTags,
    initialProjectsWithTags,
  );

  const updateProjects = async (tags: ITag[]) => {
    setSelectedTags(tags);
  };

  return (
    <>
      <TagSlider
        tags={initialProjectsWithTags.tags}
        onChange={updateProjects}
      />
      <div className="pt-12" />
      {projectData && <ProjectsWithTagsList projectData={projectData} />}
    </>
  );
};

export default GetActiveProjectsByTags;
