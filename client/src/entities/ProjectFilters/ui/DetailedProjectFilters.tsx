"use client";
import { ButtonWithIcon, ToggleOpen } from "@/shared/ui";
import { MultiselectDropdown } from "@/shared/ui";
import Image from "next/image";
import { FC, useState } from "react";
import { detailedFiltersInitialData } from "../config/initialOptions";

interface DetailedProjectFiltersProps {}

const DetailedProjectFilters: FC<DetailedProjectFiltersProps> = () => {
  const [state, setState] = useState<string[]>([]);

  return (
    <ToggleOpen
      triggerElement={
        <div className="flex items-end">
          <Image src="/filters-icon-black.svg" height={25} width={25} alt="" />
          <h2 className="-mb-[0.15rem] px-3">Расширенный поиск</h2>
          <Image
            className="mb-[0.1rem]"
            src="/arrow-right-black.svg"
            height={12}
            width={9}
            alt=""
          />
        </div>
      }
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-4 pt-5 xl:grid-cols-4 xl:grid-rows-1">
        <MultiselectDropdown
          items={state}
          onChange={setState}
          className="rounded-md p-3 shadow-center-md"
          placeholder={detailedFiltersInitialData.status.label}
          options={detailedFiltersInitialData.status.options}
        />
        <MultiselectDropdown
          items={state}
          onChange={setState}
          className="rounded-md p-3 shadow-center-md"
          placeholder={detailedFiltersInitialData.supervisor.label}
          options={detailedFiltersInitialData.supervisor.options}
        />
        <MultiselectDropdown
          items={state}
          onChange={setState}
          className="rounded-md p-3 shadow-center-md"
          placeholder={detailedFiltersInitialData.year.label}
          options={detailedFiltersInitialData.year.options}
        />
        <MultiselectDropdown
          items={state}
          onChange={setState}
          className="rounded-md p-3 shadow-center-md"
          placeholder={detailedFiltersInitialData.format.label}
          options={detailedFiltersInitialData.format.options}
        />
      </div>
    </ToggleOpen>
  );
};

export default DetailedProjectFilters;
