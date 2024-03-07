import { FC } from "react";
import { ITextField } from "../../types/fields";
import { Tooltip } from "@/shared/ui/Tooltip";
import { TextInput } from "@/shared/ui/TextInput";

interface TextFieldProps extends ITextField {
  onChange: (value: string) => void;
}

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  tooltip,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent) => {
    onChange((e.target as HTMLInputElement).value);
  };

  return (
    <div className="bg-background pt-5 rounded-lg pb-11 px-7">
      {!!tooltip && (
        <Tooltip className="text-[#A3AED0]" tooltip={tooltip}>
          <h2 className="inline-block">{label}</h2>
        </Tooltip>
      )}
      {!tooltip && <h2 className="inline-block">{label}</h2>}
      <div className="pt-6" />
      <TextInput
        className="w-full"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
