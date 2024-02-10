import { FC, HTMLAttributes, ReactElement } from "react";

interface TextWithIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactElement<HTMLAttributes<SVGSVGElement>>;
  children: string;
  size?: number;
  gap?: number;
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-between";
}

const TextWithIcon: FC<TextWithIconProps> = ({
  icon,
  children,
  alignItems = "center",
  gap = 16,
  size = 20,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={"flex items-center " + divProps.className}
      style={{
        gap: gap + "px",
        alignItems,
        ...divProps.style,
      }}
    >
      <div
        className="flex justify-center items-center"
        style={{
          height: size + "px",
          width: size + "px",
        }}
      >
        {icon}
      </div>

      <p>{children}</p>
    </div>
  );
};

export default TextWithIcon;
