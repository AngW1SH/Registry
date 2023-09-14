import Image from "next/image";
import { FC, ReactNode } from "react";

interface BackgroundFillProps {
  image: string;
  children: ReactNode;
  className?: string;
}

const BackgroundFill: FC<BackgroundFillProps> = ({
  image,
  children,
  className = "",
}) => {
  return (
    <div className={"relative " + className}>
      <Image
        className="object-cover"
        src={image}
        fill={true}
        sizes={"100%"}
        alt=""
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default BackgroundFill;
