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

  const [update, { isLoading }] = useSaveResourceMutation();

  const [hasChanged, setHasChanged] = useState(false);

  const platform = useAppSelector((state) =>
    selectPlatformById(state.platform, resource.platform)
  );

  const [localParams, setLocalParams] = useState(resource.params);

  if (!platform) return <div></div>;

  if (!(platform.name in PlatformName)) return <div></div>;

  const handleChange = (value: IResourceField) => {
    setHasChanged(true);
    setLocalParams((prev) =>
      prev.map((p) => (p.prop === value.prop ? value : p))
    );
  };

  const handleSave = async () => {
    if (hasChanged) {
      await update({ ...resource, params: localParams });
      setHasChanged(false);

      dispatch(
        resourceSlice.actions.updateParams({
          resourceId: resource.id,
          params: localParams,
        })
      );
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
        {localParams.map((param) => {
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
