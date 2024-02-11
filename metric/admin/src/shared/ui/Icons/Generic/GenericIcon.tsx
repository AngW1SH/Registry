import { FC, ReactNode, SVGProps } from "react";

interface GenericIconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  viewBox: string;
}

const GenericIcon: FC<GenericIconProps> = ({
  children,
  viewBox,
  ...svgProps
}) => {
  return (
    <svg
      {...svgProps}
      viewBox={viewBox}
      style={{
        fill: "currentcolor",
        ...svgProps.style,
      }}
    >
      {children}
    </svg>
  );
};

export default GenericIcon;
