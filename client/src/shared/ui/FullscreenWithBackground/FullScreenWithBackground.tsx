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
    <div
      className="h-screen w-screen bg-cover"
      style={{ backgroundImage: "url(" + background + ")" }}
    >
      {children}
    </div>
  );
};

export default FullScreenWithBackground;
