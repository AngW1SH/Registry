"use client";

import { Button, FormInput } from "@/shared/ui";
import { FC, useState } from "react";
import { submitContactFormData } from "../api/submitContactFormData";
import { IContactFormData } from "../types/types";

interface SendContactFormEmailProps {
  className?: string;
}

const SendContactFormEmail: FC<SendContactFormEmailProps> = ({
  className = "",
}) => {
  const [formData, setFormData] = useState<IContactFormData>({
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    submitContactFormData(formData);
  };

  return (
    <form className={"flex flex-col " + className}>
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
      <Button
        onClick={handleSubmit}
        type="submit"
        className="mt-auto w-max px-12"
      >
        Отправить
      </Button>
    </form>
  );
};

export default SendContactFormEmail;
