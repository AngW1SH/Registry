import { FC } from "react";
import { Tooltip } from "../../Tooltip";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSize?: "sm" | "lg";
  tooltip?: string;
}

const labelStyles = {
  sm: {
    fontWeight: "normal",
    fontSize: "18px",
  },
  lg: {
    fontWeight: "medium",
    fontSize: "24px",
  },
};

const TextInput: FC<TextInputProps> = ({
  className,
  label,
  tooltip = "",
  labelSize = "lg",
  ...props
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      {!!label && !tooltip && (
        <label
          htmlFor={props.id}
          className={"text-[#A3AED0]"}
          style={labelStyles[labelSize]}
        >
          {label}
        </label>
      )}
      {!!label && !!tooltip && (
        <Tooltip className="text-[#A3AED0]" tooltip={tooltip}>
          <label htmlFor={props.id} style={labelStyles[labelSize]}>
            {label}
          </label>
        </Tooltip>
      )}
      <input
        id={props.id}
        className={
          "bg-transparent p-3 border rounded-lg border-[#D6D6D6] placeholder-[#A3A3A3] w-full " +
          className
        }
        {...props}
      />
    </div>
  );
};

export default TextInput;
