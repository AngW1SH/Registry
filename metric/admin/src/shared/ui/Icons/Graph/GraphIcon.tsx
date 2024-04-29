import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface GraphIconProps extends SVGProps<SVGSVGElement> {}

const GraphIcon: FC<GraphIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={false} viewBox="0 0 24.75 20.5" {...props}>
      <path
        className="cls-1"
        d="M776.379,428.25H751.621v-1.5h24.758v1.5Zm-9.614-.792h-1.5V407.75h7.315v19.666h-1.5V409.25h-4.315v18.208Zm-4.144.083h-1.5V416.735h-4.5v10.64h-1.5v-12.14h7.5v12.306Z"
        transform="translate(-751.625 -407.75)"
      />
    </GenericIcon>
  );
};

export default GraphIcon;
