import { FC } from "react";

interface FormInputProps {
  value?: string;
  onChange?: (value: string) => any;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  label?: string;
  id?: string;
}

const FormInput: FC<FormInputProps> = ({
  value = "",
  placeholder = "",
  className = "",
  readOnly = false,
  id,
  label,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className={"flex flex-col pt-3 " + className}>
      {label && id && label.length && (
        <label className="pb-1 text-xs text-[#898989]" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={
          "border-b border-[#898989] bg-transparent pb-2 placeholder-black outline-none"
        }
        id={id}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
