import { FormCard, staticForms } from "@/entities/Form";
import { FC } from "react";

interface UserFormsProps {}

const UserForms: FC<UserFormsProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Анкеты</h2>
      <div className="pt-5" />
      <ul className="flex flex-col gap-5">
        {staticForms.map((form) => (
          <FormCard form={form} />
        ))}
      </ul>
    </div>
  );
};

export default UserForms;
