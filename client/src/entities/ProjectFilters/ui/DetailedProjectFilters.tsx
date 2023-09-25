import { ButtonWithIcon, ToggleOpen } from "@/shared/ui";
import MultiselectDropdown from "@/shared/ui/MultiselectDropdown/MultiselectDropdown";
import Image from "next/image";
import { FC } from "react";
import { detailedFiltersInitialData } from "../config/initialOptions";

interface DetailedProjectFiltersProps {}

const DetailedProjectFilters: FC<DetailedProjectFiltersProps> = () => {
  return (
    <ToggleOpen
      triggerElement={
        <div className="flex items-end py-5">
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
      <div className="grid grid-cols-4 grid-rows-1 gap-x-6 gap-y-4">
        <MultiselectDropdown
          placeholder={detailedFiltersInitialData.status.label}
          options={detailedFiltersInitialData.status.options}
        />
        <MultiselectDropdown
          placeholder={detailedFiltersInitialData.supervisor.label}
          options={detailedFiltersInitialData.supervisor.options}
        />
        <MultiselectDropdown
          placeholder={detailedFiltersInitialData.year.label}
          options={detailedFiltersInitialData.year.options}
        />
        <MultiselectDropdown
          placeholder={detailedFiltersInitialData.format.label}
          options={detailedFiltersInitialData.format.options}
        />
      </div>
    </ToggleOpen>
  );
};

export default DetailedProjectFilters;
