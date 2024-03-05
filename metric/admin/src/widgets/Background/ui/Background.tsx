import { FC } from "react";

interface BackgroundProps {}

const Background: FC<BackgroundProps> = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-[-1] bg-[url('/background.svg')] bg-cover"></div>
  );
};

export default Background;
