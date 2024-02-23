import { FC } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <input
      className={
        "bg-transparent p-3 border rounded-lg border-[#D6D6D6] placeholder-[#A3A3A3] " +
        className
      }
      {...props}
    />
  );
};

export default TextInput;
