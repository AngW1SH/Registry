import { FC, useState } from "react";
import { CheckIcon } from "../../Icons";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  value,
  onChange,
  label = "",
  className = "",
  ...props
}) => {
  const [checked, setChecked] = useState(!!value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={className}>
      <input hidden type="checkbox" {...props} onChange={handleChange} />
      <label className="flex gap-2" htmlFor={props.id}>
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
