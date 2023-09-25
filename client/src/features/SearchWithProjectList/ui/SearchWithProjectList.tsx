"use client";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  DetailedProjectFilters,
  ProjectFilters,
  ProjectFiltersSmall,
} from "@/entities/ProjectFilters";
import ProjectCardLarge from "@/entities/Project/ui/ProjectCardLarge";
import { IProject } from "@/entities/Project";
import { ITag, TagList, getTagsByTagIds } from "@/entities/Tag";
import { Transition } from "react-transition-group";
import { Container } from "@/shared/ui";
import { useFixedHeader } from "../hooks/useFixedHeader";

interface SearchWithProjectListProps {
  initialData: {
    projects: IProject[];
    tags: ITag[];
  };
}

const SearchWithProjectList: FC<SearchWithProjectListProps> = ({
  initialData,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [projectData, setProjectData] = useState(initialData);

  const {
    isRefVisible: areFiltersVisible,
    shouldRender: shouldRenderFixedHeader,
  } = useFixedHeader(ref);

  const defaultStyles = {
    height: "80px",
    top: "-80px",
    transition: !areFiltersVisible
      ? `top ${300}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : `none`,
  };

  const transitionStyles = {
    entering: {
      top: "0px",
    },
    entered: { top: "0px" },
    exiting: { top: "-80px" },
    exited: { top: "-80px" },
    unmounted: { top: "-80px" },
  };

  return (
    <>
      <div
        ref={ref}
        className="relative z-10 rounded-2xl bg-[#e0efef] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12"
      >
        <ProjectFilters />
      </div>
      <Transition in={shouldRenderFixedHeader} timeout={300}>
        {(state) => (
          <div
            className="fixed left-0 right-0 z-[1000]"
            style={{
              ...defaultStyles,
              ...transitionStyles[state],
            }}
          >
            <div className="relative z-10 w-full bg-[#e0efef] py-3 backdrop-blur-[12px]">
              <Container className=" px-8">
                <ProjectFiltersSmall />
              </Container>
            </div>
          </div>
        )}
      </Transition>
      <div className="pt-10" />
      <DetailedProjectFilters />
      <div className="border-b border-black pt-5" />
      {projectData.projects.map((project) => (
        <li
          className="list-none border-b border-black pb-3 pt-2"
          key={project.id}
        >
          <ProjectCardLarge
            className="h-full"
            project={project}
            tags={
              <TagList
                tags={getTagsByTagIds(project.tags, projectData.tags)}
                className="pl-[96px]"
              />
            }
          />
        </li>
      ))}
    </>
  );
};

export default SearchWithProjectList;
