import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectPlatformById } from "@/entities/Platform";
import {
  IResource,
  IResourceField,
  ResourceField,
  resourceSlice,
} from "@/entities/Resource";
import { FC, useState } from "react";
import { PlatformName } from "@/entities/Platform/types";
import { useSaveResourceMutation } from "@/entities/Resource/model/resourceApi";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";

interface ConfigureResourceProps {
  resource: IResource;
}

const ConfigureResource: FC<ConfigureResourceProps> = ({ resource }) => {
  const dispatch = useAppDispatch();

  const resources = useAppSelector((state) => state.resource.resources);

  const [update, { isLoading }] = useSaveResourceMutation();

  const [hasChanged, setHasChanged] = useState(false);

  const platform = useAppSelector((state) =>
    selectPlatformById(state.platform, resource.platform)
  );

  if (!platform) return <div></div>;

  if (!(platform.name in PlatformName)) return <div></div>;

  const handleChange = (value: IResourceField) => {
    setHasChanged(true);
    dispatch(
      resourceSlice.actions.setResources(
        resources.map((resourceMap) => {
          if (resourceMap.id === resource.id) {
            return {
              ...resourceMap,
              params: resourceMap.params.map((param) => {
                if (param.prop === value.prop) {
                  return value;
                }
                return param;
              }),
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
        {resource.params.map((param) => {
          return (
            <li key={param.prop}>
              <ResourceField field={param} onChange={handleChange} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ConfigureResource;
