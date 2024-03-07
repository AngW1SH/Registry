import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectPlatformById } from "@/entities/Platform";
import { IResource, ResourceField, resourceSlice } from "@/entities/Resource";
import { FC } from "react";
import { configs } from "../config";
import { PlatformName } from "@/entities/Platform/types";
import { IResourceFieldValue } from "@/entities/Resource/types/fields";
import { fetchSaveResource } from "../api/fetchSave";

interface ConfigureResourceProps {
  resource: IResource;
}

const ConfigureResource: FC<ConfigureResourceProps> = ({ resource }) => {
  const dispatch = useAppDispatch();

  const resources = useAppSelector((state) => state.resource.resources);

  const platform = useAppSelector((state) =>
    selectPlatformById(state.platform, resource.platform)
  );

  if (!platform) return <div></div>;

  if (!(platform.name in PlatformName)) return <div></div>;

  const config = configs[platform.name as PlatformName];

  const handleChange = (value: IResourceFieldValue, prop: string) => {
    dispatch(
      resourceSlice.actions.setResources(
        resources.map((resourceMap) => {
          if (resourceMap.id === resource.id) {
            return {
              ...resourceMap,
              params: { ...resourceMap.params, [prop]: value.value },
            };
          }

          return resourceMap;
        })
      )
    );
  };

  const handleSave = () => {
    fetchSaveResource(resource);
  };

  return (
    <>
      <button
        onClick={handleSave}
        className="py-6 px-14 w-full text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
      >
        Save Resource Settings
      </button>
      <div className="pt-8" />
      <ul className="flex flex-col gap-8">
        {config.data.map((field) => (
          <li key={field.prop}>
            <ResourceField field={field} onChange={handleChange} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ConfigureResource;
