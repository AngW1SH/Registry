import { useAppSelector } from "@/app/store";
import { selectPlatformById } from "@/entities/Platform";
import { IResource, ResourceField } from "@/entities/Resource";
import { FC } from "react";
import { configs } from "../config";
import { PlatformName } from "@/entities/Platform/types";
import { IResourceFieldValue } from "@/entities/Resource/types/fields";

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

  const handleChange = (value: IResourceFieldValue, prop: string) => {
    console.log(value);
    console.log(prop);
  };

  return (
    <ul className="flex flex-col gap-8">
      {config.data.map((field) => (
        <li key={field.prop}>
          <ResourceField field={field} onChange={handleChange} />
        </li>
      ))}
    </ul>
  );
};

export default ConfigureResource;
