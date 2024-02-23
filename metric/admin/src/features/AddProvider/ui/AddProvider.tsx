import { FC } from "react";

interface AddProviderProps {
  className?: string;
}

const AddProvider: FC<AddProviderProps> = ({ className = "" }) => {
  return (
    <button
      className={
        "bg-background flex text-xl justify-center rounded-lg py-4 text-[#A3AED0] font-medium " +
        className
      }
    >
      Add a New Provider
    </button>
  );
};

export default AddProvider;
