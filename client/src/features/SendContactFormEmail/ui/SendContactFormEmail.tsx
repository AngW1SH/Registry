"use client";

import { Button, FormInput } from "@/shared/ui";
import { FC, useState } from "react";

interface SendContactFormEmailProps {
  className?: string;
}

const SendContactFormEmail: FC<SendContactFormEmailProps> = ({
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  return (
    <div className={"flex flex-col " + className}>
      <FormInput
        placeholder="Имя"
        value={formData.name}
        onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
      />
      <div className="pt-5" />
      <FormInput
        placeholder="E-mail"
        value={formData.email}
        onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
      />
      <div className="pt-5" />
      <Button className="mt-auto w-max px-12">Отправить</Button>
    </div>
  );
};

export default SendContactFormEmail;
