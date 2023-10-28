"use client";
import { useProfileQuery } from "@/composites/Profile";
import { FormCard, staticForms } from "@/entities/Form";
import { FC } from "react";

interface UserFormsProps {}

const UserForms: FC<UserFormsProps> = () => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  return (
    <div>
      <h2 className="text-3xl uppercase">Анкеты</h2>
      <div className="pt-5" />
      <ul className="flex flex-col gap-5">
        {profile.forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </ul>
    </div>
  );
};

export default UserForms;
