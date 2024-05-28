import { staticMembers } from "@/entities/Member";
import { staticUsers } from "@/entities/User";
import { FC } from "react";

interface RoleTableProps {
  displayData: {
    id: number;
    roles: string[];
    name: string;
    label: string | null;
    selected: boolean;
  }[];
}

const RoleTable: FC<RoleTableProps> = ({ displayData }) => {
  return (
    <ul>
      {displayData.map((data) => (
        <li
          key={data.id}
          className={
            "relative px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7] " +
            (data.selected ? "bg-secondary" : "")
          }
        >
          <div
            className={
              "flex flex-col items-center py-3 sm:flex-row sm:py-5 " +
              (data.label ? "pt-8" : "")
            }
          >
            <p className="sm:w-min sm:min-w-[25%]">{data.roles?.join(", ")}</p>
            <p className="whitespace-nowrap pl-2 pt-1 font-bold sm:pt-0 sm:font-medium ">
              {data.name}
            </p>
            {data.label !== null && (
              <p className="absolute left-0 top-2 w-full text-center text-[0.9375rem] text-primary sm:static sm:ml-10 sm:w-auto sm:text-left">
                Представитель команды
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RoleTable;
