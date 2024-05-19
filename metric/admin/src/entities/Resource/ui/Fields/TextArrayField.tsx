import { FC, useEffect, useState } from "react";
import { IResourceFieldData, ITextArrayField } from "../../types/fields";
import { TextInput } from "@/shared/ui/TextInput";
import { Tooltip } from "@/shared/ui/Tooltip";
import { XCircleIcon } from "@/shared/ui/Icons";

const areArraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

interface TextArrayFieldProps extends ITextArrayField, IResourceFieldData {
  onChange: (value: string[]) => void;
}

const TextArrayField: FC<TextArrayFieldProps> = ({
  value,
  onChange,
  label,
  tooltip,
}) => {
  const [keys, setKeys] = useState<string[]>(value || []);

  const addKey = () => {
    setKeys([...keys, ""]);
  };

  const changeKey = (index: number, value: string) => {
    setKeys([...keys.slice(0, index), value, ...keys.slice(index + 1)]);
  };

  const removeKey = (index: number) => {
    setKeys([...keys.slice(0, index), ...keys.slice(index + 1)]);
  };

  useEffect(() => {
    if (!value || !areArraysEqual(keys, value)) onChange(keys);
  }, [keys]);

  return (
    <div>
      {!!tooltip && (
        <Tooltip className="text-[#A3AED0]" tooltip={tooltip}>
          <h2 className="inline-block">{label}</h2>
        </Tooltip>
      )}
      {!tooltip && <h2 className="inline-block">{label}</h2>}
      <div className="pt-2" />
      <ul className="flex flex-col gap-4">
        {keys.map((key, index) => (
          <li key={index} className="relative">
            <TextInput
              placeholder="Enter your API key"
              className="w-full pr-16"
              value={key}
              onChange={(e) => changeKey(index, e.target.value)}
            />
            <button
              onClick={() => removeKey(index)}
              className="h-8 w-8 cursor-pointer text-[#A3A3A3] absolute top-1/2 -translate-y-1/2 right-5"
            >
              <XCircleIcon />
            </button>
          </li>
        ))}
      </ul>
      <div className="pt-5" />
      <button
        onClick={addKey}
        className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
      >
        Add more
      </button>
    </div>
  );
};

export default TextArrayField;
