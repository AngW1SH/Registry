"use client";
import { FC, useEffect, useState } from "react";
import { ProjectStatus, initialFilters } from "../config/initialFilters";
import { Filters, ProjectStatusValue } from "../types/types";
import { Button, CalendarInput, MultiselectDropdown } from "@/shared/ui";

interface ProjectFiltersSmallProps {
  filters: Filters;
  onConfirm?: (filters: Filters) => any;
}

const ProjectFiltersSmall: FC<ProjectFiltersSmallProps> = ({
  filters,
  onConfirm,
}) => {
  const [filtersDraft, setFiltersDraft] = useState(filters);

  const handleConfirm = () => {
    if (onConfirm) onConfirm(filtersDraft);
  };

  useEffect(() => {
    setFiltersDraft(filters);
  }, [filters]);

  return (
    <div>
      <div className="flex flex-col flex-wrap rounded-2xl sm:flex-row lg:flex-nowrap lg:rounded-full lg:bg-white">
        <div className="relative flex w-full items-center overflow-hidden rounded-lg rounded-t-lg bg-white px-10 py-4 before:absolute before:bottom-0 before:left-[5%] before:hidden before:h-px before:w-[90%] before:bg-[#848686] after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:w-1/2 sm:rounded-r-none sm:px-6 sm:py-2 sm:before:left-[8%] sm:before:w-[92%] sm:after:block md:rounded-r-none lg:w-full lg:rounded-l-full lg:before:hidden">
          <input
            className="w-full text-sm font-normal placeholder-[#848686] outline-none sm:text-xs"
            placeholder="Текст"
            value={filtersDraft.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFiltersDraft({ ...filtersDraft, text: e.target.value })
            }
          />
        </div>
        <div className="relative mt-1 flex w-full items-center rounded-lg bg-white px-4 py-4 before:absolute before:bottom-0 before:left-[5%] before:hidden before:h-px before:w-[90%] before:bg-[#848686] after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:mt-0 sm:w-1/2 sm:rounded-l-none sm:px-2 sm:py-2 sm:before:left-[0%] sm:before:w-[92%] lg:w-full lg:rounded-r-none lg:before:hidden lg:after:block">
          <MultiselectDropdown
            className="w-full pl-6 pr-[0.45rem] text-sm font-normal placeholder-[#848686] outline-none sm:py-3 sm:text-xs lg:py-0"
            placeholder="Теги"
            items={filtersDraft.tags !== null ? filtersDraft.tags : []}
            options={["1", "2123", "3"]}
            onChange={(tags: string[]) =>
              setFiltersDraft({ ...filtersDraft, tags: tags })
            }
          />
        </div>
        <div
          data-testid="project-enrollment-dates-calendar"
          className="relative ml-auto mt-1 flex w-full items-center rounded-lg bg-white px-10 py-4 before:absolute before:bottom-0 before:left-[5%] before:hidden before:h-px before:w-[90%] before:bg-[#848686] after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:w-1/2 sm:rounded-r-none sm:px-6 sm:before:hidden sm:after:block md:w-1/2 lg:mt-0 lg:w-full lg:rounded-none xl:px-2"
        >
          <CalendarInput
            placeholder="Срок записи на проект"
            className="w-full text-sm lg:text-[11px] xl:text-xs"
            onChange={(start, end) =>
              setFiltersDraft({
                ...filtersDraft,
                enrollmentStart: start,
                enrollmentEnd: end,
              })
            }
          />
        </div>
        <div
          data-testid="project-dates-calendar"
          className="relative mt-1 flex w-full items-center rounded-lg rounded-b-lg bg-white px-10 py-4 after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:w-1/2 sm:rounded-l-none sm:px-6 md:w-1/2 md:rounded-br-lg md:px-6 lg:mt-0 lg:w-full lg:rounded-none lg:py-2 lg:after:block xl:px-2"
        >
          <CalendarInput
            placeholder="Срок реализации"
            className="w-full text-sm lg:text-[11px] xl:text-xs"
            onChange={(start, end) =>
              setFiltersDraft({
                ...filtersDraft,
                dateStart: start,
                dateEnd: end,
              })
            }
          />
        </div>
        <div className="relative w-full rounded-r-full pb-1 pt-4 lg:w-auto lg:bg-white lg:pl-1 lg:pr-1 lg:pt-1 xl:pl-5">
          <Button
            onClick={handleConfirm}
            className="w-full whitespace-nowrap rounded-lg px-4 text-sm lg:w-max lg:rounded-full xl:px-8 xl:text-base"
          >
            Найти проект
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFiltersSmall;
