import ToggleOpen from "@/shared/ui/ToggleOpen/ToggleOpen";
import { FC, ReactNode, useState } from "react";
import PlatformTitle from "./PlatformTitle";
import { IResource } from "@/entities/Resource";

interface PlatformMetricsProps {
  resource: IResource;
  children: ReactNode;
}

const PlatformMetrics: FC<PlatformMetricsProps> = ({ resource, children }) => {
  const [isOpened, setOpened] = useState(true);

  return (
    <ToggleOpen
      callback={setOpened}
      triggerElement={<PlatformTitle title={resource.name} opened={isOpened} />}
    >
      <div className="pt-5">{children}</div>
    </ToggleOpen>
  );
};

export default PlatformMetrics;
