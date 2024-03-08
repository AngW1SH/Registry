import { FC, ReactElement } from "react";

interface ProviderSelectProps {
  options: {
    name: string;
    icon: ReactElement;
  }[];
  selected: string | null;
  onSelect: (name: string) => void;
}

const ProviderSelect: FC<ProviderSelectProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <div className="relative">
      <h3 className={"text-[#A3AED0] text-2xl"}>Type</h3>
      <div className="pt-4" />
      <ul className="flex items-center gap-10">
        {options.map((option) => (
          <li
            className="cursor-pointer h-28 w-28 p-6 rounded-lg shadow-center-lg transition-[border]"
            onClick={() => onSelect(option.name)}
            style={{
              border: `6px solid ${
                option.name === selected ? "#5CC940" : "transparent"
              }`,
            }}
          >
            {option.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderSelect;
