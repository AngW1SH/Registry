import { FC } from "react";

interface FormInputProps {
  value?: string;
  onChange?: (value: string) => any;
  placeholder?: string;
  className?: string;
}

const FormInput: FC<FormInputProps> = ({
  value = "",
  placeholder = "",
  className = "",
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <input
      className={
        "border-b border-black bg-transparent py-3 placeholder-black outline-none " +
        className
      }
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default FormInput;
