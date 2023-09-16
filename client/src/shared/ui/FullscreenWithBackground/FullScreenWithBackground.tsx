import Image from "next/image";
import { FC, ReactNode } from "react";

interface FullScreenWithBackgroundProps {
  background: string;
  children: ReactNode;
  className?: string;
}

const FullScreenWithBackground: FC<FullScreenWithBackgroundProps> = ({
  background,
  children,
  className = "",
}) => {
  return (
    <div
      className={
        "max-w-screen relative box-border h-screen bg-cover " + className
      }
    >
      <Image
        src={background}
        className="absolute inset-0 object-cover"
        fill={true}
        quality={100}
        sizes="100%"
        alt=""
        priority
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default FullScreenWithBackground;
