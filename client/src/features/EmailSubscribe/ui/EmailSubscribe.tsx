"use client";
import { FormInput } from "@/shared/ui";
import Image from "next/image";
import { FC, useState } from "react";
import { subscribe } from "../api/subscribe";

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
        dark={false}
      />
      <button
        type="submit"
        onClick={() => subscribe(value)}
        className="absolute right-2 top-[calc(50%-10px)] h-5 w-5 cursor-pointer"
      >
        <Image src="/link-arrow-white.svg" alt="" sizes="100%" fill={true} />
      </button>
    </div>
  );
};

export default EmailSubscribe;
