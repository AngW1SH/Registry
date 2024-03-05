import { FC } from "react";
import { Link } from "react-router-dom";

interface ReturnToProjectProps {
  link: string;
}

const ReturnToProject: FC<ReturnToProjectProps> = ({ link }) => {
  return (
    <Link
      to={link}
      className="bg-background flex justify-center rounded-lg py-4 text-[#A3AED0] font-medium"
    >
      Return to project
    </Link>
  );
};

export default ReturnToProject;
