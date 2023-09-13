import Image from "next/image";
import { FC, ReactNode } from "react";

interface FullScreenWithBackgroundProps {
  background: string;
  children: ReactNode;
}

const FullScreenWithBackground: FC<FullScreenWithBackgroundProps> = ({
  background,
  children,
}) => {
  return (
    <div className="relative h-screen w-screen bg-cover">
      <Image src={background} className="absolute inset-0" fill={true} alt="" />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default FullScreenWithBackground;
