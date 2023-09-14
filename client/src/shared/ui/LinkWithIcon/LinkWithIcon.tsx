import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface LinkWithIconProps {
  children: ReactNode;
  href: string;
  className?: string;
  icon?: string;
  iconSize?: number;
}

const LinkWithIcon: FC<LinkWithIconProps> = ({
  children,
  href,
  className = "",
  icon = "/link-arrow-black.svg",
  iconSize = 12,
}) => {
  return (
    <Link href={href}>
      <button
        className={"relative " + className}
        style={{ paddingRight: iconSize + 10 + "px" }}
      >
        {children}
        <div
          className="absolute right-0 top-[calc(50%-5px)]"
          style={{
            height: iconSize + "px",
            width: iconSize + "px",
            top: "calc(50% - " + iconSize / 2 + "px)",
          }}
        >
          <Image
            className="object-contain"
            sizes={"100%"}
            fill={true}
            src={icon}
            alt=""
          />
        </div>
      </button>
    </Link>
  );
};

export default LinkWithIcon;
