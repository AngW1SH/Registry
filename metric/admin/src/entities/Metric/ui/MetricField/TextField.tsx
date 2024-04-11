import { FC } from "react";
import { ITextParam, MetricParamData } from "../../types/params";
import { Tooltip } from "@/shared/ui/Tooltip";
import { TextInput } from "@/shared/ui/TextInput";

interface TextFieldProps extends ITextParam, MetricParamData {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextField: FC<TextFieldProps> = ({
  value,
  label,
  placeholder,
  tooltip,
  onChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent) => {
    onChange((e.target as HTMLInputElement).value);
  };

  return (
    <div className={"bg-background rounded-lg " + className}>
      {!!tooltip && (
        <Tooltip className="text-[#A3AED0]" tooltip={tooltip}>
          <h2 className="inline-block">{label}</h2>
        </Tooltip>
      )}
      {!tooltip && <h2 className="inline-block">{label}</h2>}
      <div className="pt-4" />
      <TextInput
        value={value}
        className="w-full"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
