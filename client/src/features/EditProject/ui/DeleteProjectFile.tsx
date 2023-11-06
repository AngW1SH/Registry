import { FC } from "react";

interface DeleteProjectFileProps {
  className?: string;
}

const DeleteProjectFile: FC<DeleteProjectFileProps> = ({ className = "" }) => {
  return (
    <div
      className={
        "h-7 w-7 cursor-pointer rounded-full border border-[#898989] transition-[background-color,border] before:absolute before:left-1/2 before:top-1/2 before:h-4 before:w-px before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-45 before:bg-[#898989] before:transition-[background-color] after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:bg-[#898989] after:transition-[background-color] hover:bg-[#898989] hover:before:bg-white hover:after:bg-white " +
        className
      }
    ></div>
  );
};

export default DeleteProjectFile;
