import Link from "next/link";
import { FC, ReactNode } from "react";

interface LinkWithIconProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const LinkWithIcon: FC<LinkWithIconProps> = ({
  children,
  href,
  className = "",
}) => {
  return (
    <Link href={href}>
      <button
        className={
          "relative pr-6 after:absolute after:right-0 after:top-[calc(50%-5px)] after:h-3 after:w-3 after:bg-[url('/link-arrow-black.svg')] after:bg-contain " +
          className
        }
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkWithIcon;
