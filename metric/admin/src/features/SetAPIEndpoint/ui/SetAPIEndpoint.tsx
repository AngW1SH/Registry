import { TextInput } from "@/shared/ui/TextInput";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC } from "react";

interface SetAPIEndpointProps {}

const SetAPIEndpoint: FC<SetAPIEndpointProps> = () => {
  return (
    <div className="bg-background pt-5 rounded-lg pb-11 px-7">
      <Tooltip className="text-[#A3AED0]" tooltip="Set API Endpoint">
        <h2 className="inline-block">API Endpoint</h2>
      </Tooltip>
      <div className="pt-6" />
      <TextInput className="w-full" placeholder="https://example.com/api" />
    </div>
  );
};

export default SetAPIEndpoint;
