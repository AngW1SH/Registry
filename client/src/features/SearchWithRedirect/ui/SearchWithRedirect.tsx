"use client";
import { FC, useState } from "react";
import { initialFilters } from "../config/initialFilters";
import { ProjectStatus } from "../config/initialFilters";
import { ProjectStatusValue } from "../types/types";
import { Button, CalendarInput } from "@/shared/ui";

interface SearchWithRedirectProps {}

const SearchWithRedirect: FC<SearchWithRedirectProps> = () => {
  const [filters, setFilters] = useState(initialFilters);

  const handleSelectStatus = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      setFilters({
        ...filters,
        status: (e.target as HTMLLIElement).innerHTML as ProjectStatusValue,
      });
    }
  };

  return (
    <div>
      <ul className="flex" onClick={handleSelectStatus}>
        {ProjectStatus.map((value) => (
          <li
            key={value}
            className={`ml-8 cursor-pointer border-b-4 p-1 font-bold ${
              value == filters.status ? "border-primary" : "border-transparent"
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
      <div className="pt-6"></div>
      <div className="flex rounded-full bg-white p-2">
        <div className="relative flex w-full items-center pr-2 after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-[#848686]">
          <input
            className="w-full px-6 text-sm font-normal placeholder-[#848686] outline-none"
            placeholder="Название проекта"
          />
        </div>
        <div className="relative ml-auto flex items-center px-4 after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-[#848686]">
          <CalendarInput placeholder="Срок записи на проект" className="w-60" />
        </div>
        <div className="relative flex items-center px-4 after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-[#848686]">
          <CalendarInput placeholder="Срок реализации" className="w-60" />
        </div>
        <div className="relative pl-5">
          <Button className="whitespace-nowrap rounded-full px-8">
            Найти проект
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchWithRedirect;
