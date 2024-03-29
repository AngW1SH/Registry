"use client";
import { FC, useEffect, useRef } from "react";
import {
  DetailedProjectFilters,
  ProjectFilters,
  ProjectFiltersSmall,
  useFilters,
} from "@/entities/ProjectFilters";
import { IProject } from "@/entities/Project";
import { ITag } from "@/entities/Tag";
import { Transition } from "react-transition-group";
import { Container, LoadingCircle } from "@/shared/ui";
import { useFixedFilters } from "../hooks/useFixedFilters";
import { useRefHeight } from "@/shared/hooks";
import { useFixedHeaderTransitionStyles } from "../hooks/useFixedFiltersTransitionStyles";
import useProjectsQuery from "../hooks/useProjectsQuery";
import {
  IProjectsWithTags,
  ProjectsWithTagsListLarge,
} from "@/composites/ProjectsWithTags";
import { useNextPageCallback } from "../hooks/useNextPageCallback";

interface SearchWithProjectListProps {
  initialData: IProjectsWithTags;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

/*
<DetailedProjectFilters />
*/

const SearchWithProjectList: FC<SearchWithProjectListProps> = ({
  initialData,
  searchParams,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useFilters(searchParams);

  const filtersSmallRef = useRef<HTMLDivElement>(null);
  const filtersSmallHeight = useRefHeight(filtersSmallRef, 250);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: projectData,
    fetchNextPage,
    isFetchingNextPage,
  } = useProjectsQuery(filters, initialData);

  const {
    isRefVisible: areFiltersVisible,
    shouldRender: shouldRenderFixedHeader,
  } = useFixedFilters(ref);

  const { defaultStyles, transitionStyles } = useFixedHeaderTransitionStyles(
    filtersSmallHeight,
    areFiltersVisible,
  );

  useNextPageCallback(bottomRef, (entry) => {
    if (!isFetchingNextPage && bottomRef.current && entry[0].isIntersecting)
      fetchNextPage();
  });

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
      <div className="pt-10" />
      <div className="border-b border-black pt-5" />
      <Transition in={shouldRenderFixedHeader} timeout={300}>
        {(state) => (
          <div
            className="fixed left-0 right-0 z-[1000] hidden lg:block"
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
      <div>
        {projectData &&
          projectData.pages &&
          projectData.pages
            .filter((page) => page)
            .map((page, index) => (
              <ProjectsWithTagsListLarge key={index} projectData={page!} />
            ))}
      </div>
      <div ref={bottomRef}></div>
      {isFetchingNextPage && (
        <div className="mt-5 flex justify-center">
          <LoadingCircle />
        </div>
      )}
    </>
  );
};

export default SearchWithProjectList;
