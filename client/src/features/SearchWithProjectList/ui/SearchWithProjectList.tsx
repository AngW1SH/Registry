"use client";
import { FC, useRef } from "react";
import {
  DetailedProjectFilters,
  Filters,
  ProjectFilters,
  ProjectFiltersSmall,
  useFilters,
} from "@/entities/ProjectFilters";
import ProjectCardLarge from "@/entities/Project/ui/ProjectCardLarge";
import { IProject } from "@/entities/Project";
import { ITag, TagList, getTagsByTagIds } from "@/entities/Tag";
import { Transition } from "react-transition-group";
import { Container, LoadingCircle } from "@/shared/ui";
import { useFixedFilters } from "../hooks/useFixedFilters";
import { useRefHeight } from "@/shared/hooks";
import { useFixedHeaderTransitionStyles } from "../hooks/useFixedFiltersTransitionStyles";
import useProjectsQuery from "../hooks/useProjectsQuery";

interface SearchWithProjectListProps {
  initialData: {
    projects: IProject[];
    tags: ITag[];
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const SearchWithProjectList: FC<SearchWithProjectListProps> = ({
  initialData,
  searchParams,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useFilters(searchParams);

  const filtersSmallRef = useRef<HTMLDivElement>(null);
  const filtersSmallHeight = useRefHeight(filtersSmallRef, 250);

  const { data: projectData, isLoading } = useProjectsQuery(
    filters,
    initialData,
  );

  const {
    isRefVisible: areFiltersVisible,
    shouldRender: shouldRenderFixedHeader,
  } = useFixedFilters(ref);

  const { defaultStyles, transitionStyles } = useFixedHeaderTransitionStyles(
    filtersSmallHeight,
    areFiltersVisible,
  );

  return (
    <>
      <div
        ref={ref}
        className="relative z-10 rounded-2xl bg-[#e0efef] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12 md:-ml-12 md:-mr-12 xl:ml-0 xl:mr-0"
      >
        <ProjectFilters
          filters={filters}
          onConfirm={setFilters}
          dynamic={true}
        />
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
            <div
              ref={filtersSmallRef}
              className="relative z-10 w-full bg-[#e0efef] py-3 backdrop-blur-[12px]"
            >
              <Container className="px-8">
                <div className="md:-ml-12 md:-mr-12 xl:ml-0 xl:mr-0">
                  <ProjectFiltersSmall
                    filters={filters}
                    onConfirm={setFilters}
                  />
                </div>
              </Container>
            </div>
          </div>
        )}
      </Transition>
      <div className="pt-10" />
      <DetailedProjectFilters />
      <div className="border-b border-black pt-5" />
      {(!projectData || isLoading) && <LoadingCircle />}
      {projectData &&
        projectData.projects.map((project) => (
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
                />
              }
            />
          </li>
        ))}
    </>
  );
};

export default SearchWithProjectList;
