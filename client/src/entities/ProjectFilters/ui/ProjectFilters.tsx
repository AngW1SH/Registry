"use client";
import { FC, useEffect, useState } from "react";
import { ProjectStatus } from "../config/initialFilters";
import { Filters, ProjectStatusValue } from "../types/types";
import { Button, CalendarInput, MultiselectDropdown } from "@/shared/ui";
import Image from "next/image";
import { fetchFiltersTags } from "../api/fetchFiltersTags";

interface ProjectFiltersProps {
  filters: Filters;
  dynamic: boolean;
  onConfirm?: (filters: Filters) => any;
}

const fetchTagsWithErrorHandling = async (query: string) => {
  const result = await fetchFiltersTags(query);
  return result || [];
};

const ProjectFilters: FC<ProjectFiltersProps> = ({
  filters,
  onConfirm,
  dynamic,
}) => {
  const [filtersDraft, setFiltersDraft] = useState(filters);

  const handleSelectStatus = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      setFiltersDraft({
        ...filtersDraft,
        status: (e.target as HTMLLIElement).innerHTML as ProjectStatusValue,
      });
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(filtersDraft);
  };

  const handleRemoveActiveTag = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    let current = e.target;
    while (
      current.parentElement &&
      current != e.currentTarget &&
      !current.dataset.tag
    ) {
      current = current.parentElement;
    }

    if (current.dataset.tag)
      setFiltersDraft({
        ...filtersDraft,
        tags: filtersDraft.tags
          ? filtersDraft.tags.filter((tag) => tag != "" + current.dataset.tag)
          : null,
      });
  };

  useEffect(() => {
    setFiltersDraft(filters);
  }, [filters]);

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
              value == filtersDraft.status
                ? "border-primary"
                : "border-transparent"
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
      <div className="pt-6"></div>
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
            options={[]}
            onChange={(tags: string[]) =>
              setFiltersDraft({ ...filtersDraft, tags: tags })
            }
            fetchSuggestions={fetchTagsWithErrorHandling}
          />
        </div>
        <div
          data-testid="project-enrollment-dates-calendar"
          className="relative ml-auto mt-1 flex w-full items-center rounded-lg bg-white px-10 py-4 before:absolute before:bottom-0 before:left-[5%] before:hidden before:h-px before:w-[90%] before:bg-[#848686] after:absolute after:right-0 after:top-[10%] after:hidden after:h-[80%] after:w-px after:bg-[#848686] sm:w-1/2 sm:rounded-r-none sm:px-6 sm:before:hidden sm:after:block md:w-1/2 lg:mt-0 lg:w-full lg:rounded-none xl:px-2"
        >
          <CalendarInput
            placeholder="Срок записи на проект"
            className="w-full text-sm lg:text-[11px] xl:text-xs"
            start={filtersDraft.enrollmentStart}
            end={filtersDraft.enrollmentStart}
            onChange={(start, end) =>
              setFiltersDraft({
                ...filtersDraft,
                enrollmentStart: start
                  ? start.toLocaleDateString("fr-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : start,
                enrollmentEnd: end
                  ? end.toLocaleDateString("fr-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : end,
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
            start={filtersDraft.dateStart}
            end={filtersDraft.dateEnd}
            onChange={(start, end) =>
              setFiltersDraft({
                ...filtersDraft,
                dateStart: start
                  ? start.toLocaleDateString("fr-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : start,
                dateEnd: end
                  ? end.toLocaleDateString("fr-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : end,
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
      {dynamic &&
        filtersDraft.tags !== null &&
        filtersDraft.tags.length != 0 && (
          <ul className="flex gap-4 pt-4" onClick={handleRemoveActiveTag}>
            {filtersDraft.tags.map((tag) => (
              <li
                className="relative rounded-full bg-white py-2 pl-6 pr-10"
                key={tag}
                data-tag={tag}
              >
                {tag}
                <div className="absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer">
                  <Image src="/x-gray.svg" alt="" fill={true} />
                </div>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default ProjectFilters;
