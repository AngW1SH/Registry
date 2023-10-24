import Image from "next/image";
import { FC } from "react";

interface FormCheckboxProps {
  onToggle: (state: boolean) => any;
  value: boolean;
  id: string;
  label: string;
}

const FormCheckbox: FC<FormCheckboxProps> = ({
  value,
  id,
  onToggle,
  label,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        className="invisible absolute"
        id={id}
        checked={value}
        onChange={() => onToggle(!value)}
      />

      <label
        className="text-title-900 flex cursor-pointer items-start text-sm font-light"
        htmlFor={id}
      >
        <div
          className={`${
            value ? "bg-[#363636]" : ""
          } relative mr-4 mt-2 min-h-[20px] min-w-[20px] cursor-pointer rounded-sm border border-[#363636]`}
        >
          <Image
            fill={true}
            alt=""
            className={`${value ? "" : "hidden"} p-[0.175rem]`}
            src="/input-checked.svg"
          />
        </div>
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
