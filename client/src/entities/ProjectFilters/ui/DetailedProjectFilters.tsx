import { ButtonWithIcon, ToggleOpen } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

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
      456
    </ToggleOpen>
  );
};

export default DetailedProjectFilters;
