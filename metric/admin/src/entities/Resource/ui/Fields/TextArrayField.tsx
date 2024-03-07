import { FC, useEffect, useState } from "react";
import { ITextArrayField } from "../../types/fields";
import { TextInput } from "@/shared/ui/TextInput";
import { Tooltip } from "@/shared/ui/Tooltip";
import { XCircleIcon } from "@/shared/ui/Icons";

interface TextArrayFieldProps extends ITextArrayField {
  onChange: (value: string[]) => void;
  value: string[];
}

const TextArrayField: FC<TextArrayFieldProps> = ({ value, onChange }) => {
  const [keys, setKeys] = useState<string[]>(value);

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
    onChange(keys);
  }, [keys]);

  return (
    <div className="bg-background pt-5 rounded-lg pb-11 px-7">
      <Tooltip className="text-[#A3AED0]" tooltip="Set API Keys">
        <h2 className="inline-block">API keys</h2>
      </Tooltip>
      <div className="pt-5" />
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
