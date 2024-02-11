import ToggleOpen from "@/shared/ui/ToggleOpen/ToggleOpen";
import { FC, ReactNode, useState } from "react";
import PlatformTitle from "./PlatformTitle";

interface PlatformMetricsProps {
  children: ReactNode;
}

const PlatformMetrics: FC<PlatformMetricsProps> = ({ children }) => {
  const [isOpened, setOpened] = useState(true);

  return (
    <ToggleOpen
      callback={setOpened}
      triggerElement={<PlatformTitle opened={isOpened} />}
    >
      <div className="pt-5">{children}</div>
    </ToggleOpen>
  );
};

export default PlatformMetrics;
