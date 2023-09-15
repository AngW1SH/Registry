import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface HeroSearchProps {}

const HeroSearch: FC<HeroSearchProps> = () => {
  return (
    <div className="relative z-10 rounded-2xl bg-[#bef6f262] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12">
      <SearchWithRedirect />
    </div>
  );
};

export default HeroSearch;
