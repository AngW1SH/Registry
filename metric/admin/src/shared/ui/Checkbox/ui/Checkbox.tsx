import { FC, useRef } from "react";
import { CheckIcon } from "../../Icons";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  value,
  checked,
  onChange,
  label = "",
  className = "",
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={className}>
      <input
        ref={inputRef}
        hidden
        checked={checked}
        type="checkbox"
        onChange={onChange}
      />
      <label
        className="flex gap-2"
        htmlFor={props.id}
        onClick={() => inputRef.current?.click()}
      >
        <div
          tabIndex={0}
          className="cursor-pointer w-5 h-5 border border-current rounded flex justify-center items-center p-[2px]"
        >
          {checked && <CheckIcon />}
        </div>
        {!!label && <p className="text-current cursor-pointer">{label}</p>}
      </label>
    </div>
  );
};

export default Checkbox;
