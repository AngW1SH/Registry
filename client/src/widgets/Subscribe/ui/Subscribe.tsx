import { EmailSubscribe } from "@/features/EmailSubscribe";
import Image from "next/image";
import { FC } from "react";

interface SubscribeProps {}

const Subscribe: FC<SubscribeProps> = () => {
  return (
    <div className="relative overflow-hidden rounded-xl px-16 py-14">
      <Image src="/hero.png" fill={true} sizes="100%" alt="" />
      <div className="relative flex items-center justify-between font-medium text-white">
        <div className="w-full">
          <h2 className="text-3xl">ПОЧТОВАЯ РАССЫЛКА</h2>
          <div className="pt-3" />
          <p>Подпишись, чтобы не пропустить проект</p>
        </div>
        <div className="w-full">
          <EmailSubscribe />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
