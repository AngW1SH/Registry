import { FC } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ className, label, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {!!label && (
        <label
          htmlFor={props.id}
          className="text-[#A3AED0] font-medium text-2xl"
        >
          {label}
        </label>
      )}
      <input
        id={props.id}
        className={
          "bg-transparent p-3 border rounded-lg border-[#D6D6D6] placeholder-[#A3A3A3] " +
          className
        }
        {...props}
      />
    </div>
  );
};

export default TextInput;
