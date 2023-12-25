import { usePathname } from "next/navigation";
import React, { FC, useEffect } from "react";

interface MarginnedAnchorProps {
  id: string;
  offset?: number;
}

const MarginnedAnchor: FC<MarginnedAnchorProps> = ({ id, offset }) => {
  return (
    <a
      id={id}
      className="block"
      style={{ transform: "translate(0, " + (offset ? -offset : -150) + "px)" }}
    ></a>
  );
};

export default MarginnedAnchor;
