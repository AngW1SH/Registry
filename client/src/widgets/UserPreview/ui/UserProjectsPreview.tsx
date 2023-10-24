import { ProjectCardWithStatus, staticProjects } from "@/entities/Project";
import { NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface UserProjectsPreviewProps {
  className?: string;
}

const UserProjectsPreview: FC<UserProjectsPreviewProps> = ({
  className = "",
}) => {
  return (
    <NamedBlock className={className} title={"Проекты"}>
      <ProjectCardWithStatus project={staticProjects[1]} />
      <p className="pl-16 pt-1 font-[0.9375rem] text-[#898989]">Показать ещё</p>
    </NamedBlock>
  );
};

export default UserProjectsPreview;
