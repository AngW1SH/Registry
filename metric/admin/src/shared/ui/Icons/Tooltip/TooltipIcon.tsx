import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface TooltipIconProps extends SVGAttributes<SVGSVGElement> {}

const TooltipIcon: FC<TooltipIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={true} viewBox="0 0 24 24" {...props}>
      <path
        d="M9.87885 7.51884C11.0504 6.49372 12.9499 6.49372 14.1215 7.51884C15.2931 8.54397 15.2931 10.206 14.1215 11.2312C13.9176 11.4096 13.6916 11.5569 13.4513 11.6733C12.7056 12.0341 12.0002 12.6716 12.0002 13.5V14.25M20.9999 12C20.9999 16.9706 16.9705 21 11.9999 21C7.02938 21 2.99994 16.9706 2.99994 12C2.99994 7.02944 7.02938 3 11.9999 3C16.9705 3 20.9999 7.02944 20.9999 12ZM11.9999 17.25H12.0074V17.2575H11.9999V17.25Z"
        fill="none"
        strokeWidth="1.38179"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </GenericIcon>
  );
};

export default TooltipIcon;
