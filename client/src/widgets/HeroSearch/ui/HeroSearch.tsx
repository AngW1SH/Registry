import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface HeroSearchProps {}

const HeroSearch: FC<HeroSearchProps> = () => {
  return (
    <div className="relative z-10 rounded-2xl bg-[#bef6f262] px-8 pb-14 pt-12 backdrop-blur-[12px]">
      <SearchWithRedirect />
    </div>
  );
};

export default HeroSearch;
