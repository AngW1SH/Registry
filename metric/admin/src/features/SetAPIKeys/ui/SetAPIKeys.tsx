import { XCircleIcon } from "@/shared/ui/Icons";
import { TextInput } from "@/shared/ui/TextInput";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC, useState } from "react";

interface SetAPIKeysProps {}

const SetAPIKeys: FC<SetAPIKeysProps> = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const addKey = () => {
    setKeys([...keys, ""]);
  };

  const changeKey = (index: number, value: string) => {
    setKeys([...keys.slice(0, index), value, ...keys.slice(index + 1)]);
  };

  const removeKey = (index: number) => {
    setKeys([...keys.slice(0, index), ...keys.slice(index + 1)]);
  };

  return (
    <div className="bg-background pt-5 rounded-lg pb-11 px-7">
      <Tooltip className="text-[#A3AED0]" tooltip="Set API Keys">
        <h2 className="inline-block">API keys</h2>
      </Tooltip>
      <div className="pt-5" />
      <ul className="flex flex-col gap-4">
        {keys.map((key, index) => (
          <li className="relative">
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

export default SetAPIKeys;
