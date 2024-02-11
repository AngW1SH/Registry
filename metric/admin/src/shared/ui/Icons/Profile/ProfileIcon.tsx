import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface ProfileIconProps extends SVGProps<SVGSVGElement> {}

const ProfileIcon: FC<ProfileIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 13 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8421 4.41414C10.8421 6.5951 9.0934 8.34388 6.9109 8.34388C4.72914 8.34388 2.97972 6.5951 2.97972 4.41414C2.97972 2.23318 4.72914 0.485138 6.9109 0.485138C9.0934 0.485138 10.8421 2.23318 10.8421 4.41414ZM6.9109 15.3366C3.68989 15.3366 0.970306 14.8131 0.970306 12.7933C0.970306 10.7727 3.70698 10.2678 6.9109 10.2678C10.1327 10.2678 12.8515 10.7913 12.8515 12.8111C12.8515 14.8317 10.1148 15.3366 6.9109 15.3366Z"
      />
    </GenericIcon>
  );
};

export default ProfileIcon;
