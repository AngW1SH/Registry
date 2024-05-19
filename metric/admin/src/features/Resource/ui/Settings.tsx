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

interface SettingsProps {
  resource: IResource;
}

const Settings: FC<SettingsProps> = ({ resource }) => {
  const dispatch = useAppDispatch();
  const [update, { isLoading }] = useSaveResourceMutation();
  const [hasChanged, setHasChanged] = useState(false); // Only allow making a request when there are changes

  const platform = useAppSelector((state) =>
    selectPlatformById(state.platform, resource.platform)
  );

  // Edit locally to not cause freezes due to redux updates
  const [localParams, setLocalParams] = useState(resource.params);

  if (!platform) return <div></div>;
  if (!(platform.name in PlatformName)) return <div></div>;

  // Save changes locally
  const handleChange = (value: IResourceField) => {
    setHasChanged(true);
    setLocalParams((prev) =>
      prev.map((p) => (p.prop === value.prop ? value : p))
    );
  };

  // Make a request and save changes to redux
  const handleSave = async () => {
    if (!hasChanged) return;

    const result = await update({ ...resource, params: localParams });
    if (!result.hasOwnProperty("error")) {
      dispatch(
        resourceSlice.actions.updateParams({
          resourceId: resource.id,
          params: localParams,
        })
      );
    }
    setHasChanged(false);
  };

  return (
    <>
      <div className=" bg-background rounded-lg py-14 px-7">
        <h2 className="font-semibold text-4xl">Resource Parameters</h2>
        <ul className="flex flex-col py-8 gap-6">
          {localParams.map((param) => {
            return (
              <li key={param.prop}>
                <ResourceField field={param} onChange={handleChange} />
              </li>
            );
          })}
        </ul>
        <div className="pt-3" />
        {isLoading && (
          <div className="px-10 flex w-[350px] justify-center font-medium rounded-lg text-[#551FFF] bg-[#F3F0FF]">
            <LoadingCircle size={32} />
          </div>
        )}
        {!isLoading && (
          <button
            onClick={handleSave}
            className={
              "py-3 px-14 font-medium rounded-lg w-[350px] " +
              (hasChanged
                ? "text-[#FFF] bg-[#5321ff]"
                : "text-black bg-[#E5E5E5]")
            }
          >
            Save Resource Settings
          </button>
        )}
      </div>
    </>
  );
};

export default Settings;
