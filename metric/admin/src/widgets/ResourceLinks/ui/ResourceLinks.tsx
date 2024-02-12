import { FC } from "react";
import Resource from "./Resource";
import { GitLabIcon, GithubIcon, TrelloIcon } from "@/shared/ui/Icons";

interface ResourceLinksProps {}

const ResourceLinks: FC<ResourceLinksProps> = () => {
  return (
    <div>
      <h2 className="text-xl text-[#404040] font-semibold">Resource Links</h2>
      <p className="text-[#AEAEAE] mt-1">Associated with the project</p>
      <ul className="mt-3 flex flex-col gap-y-4">
        <li>
          <Resource
            icon={<GithubIcon />}
            platform="GitHub"
            title="AngW1SH/Registry"
          />
        </li>
        <li>
          <Resource icon={<TrelloIcon />} platform="Trello" title="Registry" />
        </li>
        <li>
          <Resource icon={<GitLabIcon />} platform="GitLab" title="Registry" />
        </li>
      </ul>
    </div>
  );
};

export default ResourceLinks;
