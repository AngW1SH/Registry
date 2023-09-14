import { FC } from "react";
import { links } from "../static/links";
import Link from "next/link";
import { LinkWithIcon } from "@/shared/ui";

interface OtherLinksProps {}

const OtherLinks: FC<OtherLinksProps> = () => {
  return (
    <ul className="flex justify-between gap-6">
      {links.map((link) => (
        <li className="w-full bg-[#e0efef] px-7 py-9">
          <h2 className="text-2xl font-medium">{link.title}</h2>
          <div className="pt-16" />
          <LinkWithIcon
            href={link.link}
            icon={"/link-arrow-black-alt.svg"}
            iconSize={16}
          >
            Просмотреть
          </LinkWithIcon>
        </li>
      ))}
    </ul>
  );
};

export default OtherLinks;
