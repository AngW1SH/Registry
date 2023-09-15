"use client";
import { FormInput } from "@/shared/ui";
import Image from "next/image";
import { FC, useState } from "react";

interface EmailSubscribeProps {}

const EmailSubscribe: FC<EmailSubscribeProps> = () => {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <FormInput
        value={value}
        onChange={setValue}
        className="w-full border-white pr-12 text-white placeholder-white placeholder:uppercase"
        placeholder="Электронная почта"
      />
      <button className="absolute right-2 top-[calc(50%-10px)] h-5 w-5 cursor-pointer">
        <Image src="/link-arrow-white.svg" alt="" sizes="100%" fill={true} />
      </button>
    </div>
  );
};

export default EmailSubscribe;
