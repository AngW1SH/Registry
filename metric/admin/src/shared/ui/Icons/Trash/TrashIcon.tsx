import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface TrashIconProps extends SVGProps<SVGSVGElement> {}

const TrashIcon: FC<TrashIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={false} viewBox="0 0 16.82 18" {...props}>
      <path
        className="cls-1"
        d="M1234.12,429.511h-11.24l-1.28-14.834h13.8Zm-9.86-1.5h8.48l1.03-11.834h-10.54Zm12.65-15.022h-16.82v-1.5h16.82v1.5Z"
        transform="translate(-1220.09 -411.5)"
      />
    </GenericIcon>
  );
};

export default TrashIcon;
