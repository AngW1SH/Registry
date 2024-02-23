import { FC, ReactNode, SVGProps } from "react";

interface GenericIconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  viewBox: string;
  hasStroke?: boolean;
  hasFill?: boolean;
}

const GenericIcon: FC<GenericIconProps> = ({
  children,
  viewBox,
  hasStroke = false,
  hasFill = true,
  ...svgProps
}) => {
  return (
    <svg
      {...svgProps}
      viewBox={viewBox}
      style={{
        ...(hasFill && { fill: "currentcolor" }),
        ...(hasStroke && { stroke: "currentcolor" }),
        ...svgProps.style,
      }}
    >
      {children}
    </svg>
  );
};

export default GenericIcon;
