"use client";
import { FC, useState } from "react";
import { ProjectStatus, initialFilters } from "../config/initialFilters";
import { Filters, ProjectStatusValue } from "../types/types";
import { Button, CalendarInput } from "@/shared/ui";

interface ProjectFiltersProps {
  onConfirm?: (filters: Filters) => any;
}

const ProjectFilters: FC<ProjectFiltersProps> = ({ onConfirm }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleSelectStatus = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      setFilters({
        ...filters,
        status: (e.target as HTMLLIElement).innerHTML as ProjectStatusValue,
      });
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(filters);
  };

  return (
    <div>
      <ul
        className="hidden flex-wrap text-sm sm:flex lg:text-base"
        onClick={handleSelectStatus}
      >
        {ProjectStatus.map((value) => (
          <li
            key={value}
            className={`cursor-pointer border-b-4 p-1 font-bold sm:ml-4 lg:ml-8 ${
              value == filters.status ? "border-primary" : "border-transparent"
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
      <div className="pt-6"></div>
      <div className="flex flex-col flex-wrap rounded-2xl sm:flex-row lg:flex-nowrap lg:rounded-full">
        <div className="relative flex items-center overflow-hidden rounded-t-lg bg-white px-10 py-4 before:absolute before:bottom-0 before:left-[5%] before:h-px before:w-[90%] before:bg-[#848686] after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:w-1/2 sm:rounded-t-lg sm:px-2 sm:py-2 lg:w-full lg:rounded-l-full lg:before:hidden lg:after:block">
          <input
            className="w-full text-sm font-normal placeholder-[#848686] outline-none sm:px-6"
            placeholder="Название проекта"
            value={filters.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, text: e.target.value })
            }
          />
        </div>
        <div
          data-testid="project-enrollment-dates-calendar"
          className="relative ml-auto flex w-full items-center bg-white px-10 py-4 before:absolute before:bottom-0 before:left-[5%] before:h-px before:w-[90%] before:bg-[#848686] after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:order-3 sm:w-1/2 sm:rounded-bl-lg sm:px-2 sm:before:hidden sm:after:block lg:order-2 lg:w-auto lg:rounded-none xl:px-4"
        >
          <CalendarInput
            placeholder="Срок записи на проект"
            className="w-full text-sm sm:pl-5 lg:w-52 lg:text-[11px] xl:w-64 xl:text-sm"
            onChange={(start, end) =>
              setFilters({
                ...filters,
                enrollmentStart: start,
                enrollmentEnd: end,
              })
            }
          />
        </div>
        <div
          data-testid="project-dates-calendar"
          className="relative  flex items-center rounded-b-lg bg-white px-10 py-4 after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:order-4 sm:w-1/2 sm:rounded-r-lg sm:rounded-bl-none sm:px-2 lg:order-3 lg:w-auto lg:rounded-none lg:py-2 lg:after:block xl:px-4"
        >
          <CalendarInput
            placeholder="Срок реализации"
            className="w-full text-sm lg:w-52 lg:text-[11px] xl:w-64 xl:text-sm"
            onChange={(start, end) =>
              setFilters({ ...filters, dateStart: start, dateEnd: end })
            }
          />
        </div>
        <div className="relative rounded-r-full pb-1 pt-4 sm:order-2 sm:w-1/2 sm:pl-1 sm:pt-0 md:pr-1 md:pt-1 lg:order-4 lg:w-auto lg:bg-white xl:pl-5">
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

export default ProjectFilters;
