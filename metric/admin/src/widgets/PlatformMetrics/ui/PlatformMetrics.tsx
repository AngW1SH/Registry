import ToggleOpen from "@/shared/ui/ToggleOpen/ToggleOpen";
import { FC, ReactNode, useState } from "react";
import PlatformTitle from "./PlatformTitle";
import { IResource } from "@/entities/Resource";
import { useAppSelector } from "@/app/store";

interface PlatformMetricsProps {
  resource: IResource;
  children: ReactNode;
}

const PlatformMetrics: FC<PlatformMetricsProps> = ({ resource, children }) => {
  const [isOpened, setOpened] = useState(true);

  const platform = useAppSelector((state) =>
    state.platform.platforms.find(
      (platform) => platform.id === resource.platform
    )
  );

  if (!platform) return <></>;

  return (
    <ToggleOpen
      callback={setOpened}
      triggerElement={
        <PlatformTitle
          title={resource.name}
          platform={platform.name}
          opened={isOpened}
        />
      }
    >
      <div className="pt-5">{children}</div>
    </ToggleOpen>
  );
};

export default PlatformMetrics;
