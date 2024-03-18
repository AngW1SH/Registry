import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectPlatformById } from "@/entities/Platform";
import { IResource, ResourceField, resourceSlice } from "@/entities/Resource";
import { FC, useState } from "react";
import { configs } from "../config";
import { PlatformName } from "@/entities/Platform/types";
import { IResourceFieldValue } from "@/entities/Resource/types/fields";
import { useSaveResourceMutation } from "@/entities/Resource/model/resourceApi";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";

interface ConfigureResourceProps {
  resource: IResource;
}

const ConfigureResource: FC<ConfigureResourceProps> = ({ resource }) => {
  const dispatch = useAppDispatch();

  const resources = useAppSelector((state) => state.resource.resources);

  const [update, { isLoading }] = useSaveResourceMutation();

  const platform = useAppSelector((state) =>
    selectPlatformById(state.platform, resource.platform)
  );

  if (!platform) return <div></div>;

  if (!(platform.name in PlatformName)) return <div></div>;

  const config = configs[platform.name as PlatformName];

  const [hasChanged, setHasChanged] = useState(false);

  const handleChange = (value: IResourceFieldValue, prop: string) => {
    setHasChanged(true);
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

  const handleSave = async () => {
    if (hasChanged) {
      await update(resource);
      setHasChanged(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="py-3 px-10 flex justify-center w-full font-medium rounded-lg text-[#551FFF] bg-[#F3F0FF]">
          <LoadingCircle size={32} />
        </div>
      )}
      {!isLoading && (
        <button
          onClick={handleSave}
          className={
            "py-6 px-14 w-full font-medium rounded-lg " +
            (hasChanged
              ? "text-[#551FFF] bg-[#F3F0FF]"
              : "text-black bg-[#E5E5E5]")
          }
        >
          Save Resource Settings
        </button>
      )}
      <div className="pt-8" />
      <ul className="flex flex-col gap-8">
        {config.data.map((field) => {
          const value: IResourceFieldValue = {
            type: field.type,
            value: resource.params[field.prop],
          };
          return (
            <li key={field.prop}>
              <ResourceField
                field={field}
                value={value}
                onChange={handleChange}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ConfigureResource;
