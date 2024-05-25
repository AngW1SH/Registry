import { FC } from "react";
import { ISelectTextParam, MetricParamData } from "../../types/params";
import { Dropdown } from "@/shared/ui/Dropdown";
import { Tooltip } from "@/shared/ui/Tooltip";

interface SelectTextFieldProps extends ISelectTextParam, MetricParamData {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SelectTextField: FC<SelectTextFieldProps> = ({
  options,
  value,
  onChange,
  className = "",
  tooltip,
  label,
  ...param
}) => {
  return (
    <div className={className}>
      {!!tooltip && (
        <Tooltip className="text-[#A3AED0]" tooltip={tooltip}>
          <h2 className="inline-block">{label}</h2>
        </Tooltip>
      )}
      {!tooltip && <h2 className="inline-block">{label}</h2>}
      <Dropdown
        namePrefix={param.name}
        value={value}
        options={options}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

export default SelectTextField;
