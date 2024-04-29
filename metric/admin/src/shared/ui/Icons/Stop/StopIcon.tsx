import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface StopIconProps extends SVGProps<SVGSVGElement> {}

const StopIcon: FC<StopIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={false} viewBox="0 0 21.312 21.312" {...props}>
      <path
        className="cls-1"
        d="M445.5,430.171A10.671,10.671,0,1,1,456.171,419.5,10.683,10.683,0,0,1,445.5,430.171Zm0-19.842a9.171,9.171,0,1,0,6.146,2.364A9.181,9.181,0,0,0,445.5,410.329Zm-6.177,16.688-1.061-1.061L452.116,412.1l1.06,1.061Z"
        transform="translate(-434.844 -408.844)"
      />
    </GenericIcon>
  );
};

export default StopIcon;
