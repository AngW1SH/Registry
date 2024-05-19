import { ArrowDown } from "@/shared/ui/Icons";
import { FC } from "react";
import { Link } from "react-router-dom";

interface GoToViewProps {
  link: string;
}

const GoToView: FC<GoToViewProps> = ({ link }) => {
  return (
    <Link to={link} className="flex items-center gap-3">
      <div className="h-9 w-9 p-3 pt-[15px] rotate-90 rounded-full bg-background">
        <ArrowDown />
      </div>
      <p className="text-[#828487] text-sm">Back to Project</p>
    </Link>
  );
};

export default GoToView;
