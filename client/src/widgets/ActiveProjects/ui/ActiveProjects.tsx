import { IProject } from "@/entities/Project";
import { ITag } from "@/entities/Tag";
import {
  GetActiveProjectsByTags,
  fetchActiveProjectsData,
} from "@/features/GetActiveProjectsByTags";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";

interface ActiveProjectsProps {
  data?: {
    projects: IProject[];
    tags: ITag[];
  };
}

const ActiveProjects: FC<ActiveProjectsProps> = async ({ data }) => {
  const endData = data ? data : await fetchActiveProjectsData();

  return (
    <div>
      {endData && <GetActiveProjectsByTags initialProjectsWithTags={endData} />}
      <div className="pt-7" />
      <LinkWithIcon href="/projects">Показать ещё</LinkWithIcon>
    </div>
  );
};

export default ActiveProjects;
