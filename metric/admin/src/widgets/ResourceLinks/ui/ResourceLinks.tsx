import { FC } from "react";
import Resource from "./Resource";
import { useAppSelector } from "@/app/store";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { PlatformName } from "@/entities/Platform/types";
import { PlatformIcon } from "@/entities/Platform";

interface ResourceLinksProps {}

const ResourceLinks: FC<ResourceLinksProps> = () => {
  const resources = useAppSelector((state) => state.resource.resources);
  const platforms = useAppSelector((state) => state.platform.platforms);

  const isLoading = useAppSelector(
    (state) => state.resource.isLoading || state.platform.isLoading
  );

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <LoadingCircle />
      </div>
    );

  const data = resources
    .map((resource) => ({
      name: resource.name,
      platform:
        platforms.find((platform) => platform.id == resource.platform)?.name ||
        "",
      url: resource.params.find(
        (param) => param.prop === "url" && param.type == "text"
      )?.value,
    }))
    .filter((data) => !!data.url);

  if (!data.length) return <></>;

  return (
    <div>
      <h2 className="text-xl text-[#404040] font-semibold">Resource Links</h2>
      <p className="text-[#AEAEAE] mt-1">Associated with the project</p>
      <ul className="mt-3 flex flex-col gap-y-4">
        {data.map(({ name, platform, url }) => (
          <Resource
            key={name}
            title={name}
            platform={platform}
            icon={<PlatformIcon name={platform as PlatformName} />}
            url={url as string}
          />
        ))}
      </ul>
    </div>
  );
};

export default ResourceLinks;
