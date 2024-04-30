import { FC } from "react";
import { IBooleanParam, MetricParamData } from "../../types/params";
import { Checkbox } from "@/shared/ui/Checkbox";

interface BooleanFieldProps extends IBooleanParam, MetricParamData {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const BooleanField: FC<BooleanFieldProps> = ({
  value,
  label,
  onChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent) => {
    onChange((e.target as HTMLInputElement).checked);
  };

  return (
    <Checkbox
      className={"text-[#A3AED0] " + className}
      checked={value}
      onChange={handleChange}
      label={label}
    />
  );
};

export default BooleanField;
