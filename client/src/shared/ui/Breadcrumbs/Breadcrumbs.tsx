import { FC } from "react";
import { BreadcrumbData } from "./types/types";
import Link from "next/link";

export interface BreadcrumbsProps {
  data: BreadcrumbData[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ data }) => {
  return (
    <ul className="flex text-[#77787b]">
      {data.map((entry) => (
        <li className="relative mr-10 after:absolute after:-right-6 after:top-1/2 after:block after:h-[0.9rem] after:w-[0.45rem] after:-translate-y-1/2 after:bg-[url('/arrow-right-gray.svg')] after:bg-contain last:after:hidden">
          <Link href={entry.link}>{entry.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
