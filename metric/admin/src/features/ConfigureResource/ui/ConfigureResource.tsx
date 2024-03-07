import { useAppSelector } from "@/app/store";
import { selectPlatformById } from "@/entities/Platform";
import { IResource, ResourceField } from "@/entities/Resource";
import { FC } from "react";
import { configs } from "../config";
import { PlatformName } from "@/entities/Platform/types";

interface ConfigureResourceProps {
  resource: IResource;
}

const ConfigureResource: FC<ConfigureResourceProps> = ({ resource }) => {
  const platform = useAppSelector((state) =>
    selectPlatformById(state.platform, resource.platform)
  );

  if (!platform) return <div></div>;

  if (!(platform.name in PlatformName)) return <div></div>;

  const config = configs[platform.name as PlatformName];

  return (
    <div>
      {config.data.map((field) => (
        <ResourceField key={field.prop} field={field} />
      ))}
    </div>
  );
};

export default ConfigureResource;
