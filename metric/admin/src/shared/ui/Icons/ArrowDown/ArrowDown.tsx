import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface ArrowDownProps extends SVGProps<SVGSVGElement> {}

const ArrowDown: FC<ArrowDownProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 24 15" style={{ fill: "none" }} {...props}>
      <path d="M23 2L12 12L0.999999 2" stroke="#33363F" strokeWidth="3" />
    </GenericIcon>
  );
};

export default ArrowDown;
