import { FC, HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import Header from "./Header";
import { IResource } from "../../types";
import ToggleOpen from "@/shared/ui/ToggleOpen/ToggleOpen";

interface CardProps {
  resource: IResource;
  icon: ReactElement<HTMLAttributes<SVGSVGElement>>;
  children: ReactNode;
  actions?: ReactNode;
}

const Card: FC<CardProps> = ({ resource, icon, children, actions }) => {
  const [isOpened, setOpened] = useState(true);

  return (
    <ToggleOpen
      callback={setOpened}
      triggerElement={
        <Header
          title={resource.name}
          icon={icon}
          opened={isOpened}
          actions={actions}
        />
      }
    >
      <div className="pt-5">{children}</div>
    </ToggleOpen>
  );
};

export default Card;
