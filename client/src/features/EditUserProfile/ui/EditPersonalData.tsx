"use client";
import { FormInput, NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface EditPersonalDataProps {}

const EditPersonalData: FC<EditPersonalDataProps> = () => {
  return (
    <NamedBlock title={"Личные данные"} border={false}>
      <div className="flex flex-wrap items-end justify-between gap-y-2">
        <FormInput
          className="order-1 w-full sm:w-[calc(50%+1px)]"
          value={"Лалуев"}
          placeholder="Фамилия"
          readOnly={true}
        />
        <FormInput
          className="order-2 w-full sm:w-[calc(50%+1px)]"
          value={"Денис"}
          placeholder="Имя"
          readOnly={true}
        />
        <FormInput
          label="Дата рождения"
          id="userProfileBirthday"
          className="order-4 w-3/4 sm:order-3 sm:w-4/12"
          value={"20.02.2002"}
          readOnly={true}
        />
        <FormInput
          className="order-3 w-full sm:order-4 sm:w-[calc(50%+1px)]"
          value={"Витальевич"}
          placeholder="Отчество"
          readOnly={true}
        />
        <FormInput
          label="Город"
          id="userProfileHometown"
          className="order-5 w-3/4 sm:w-4/12"
          value={"Санкт-Петербург"}
          readOnly={true}
        />
      </div>
    </NamedBlock>
  );
};

export default EditPersonalData;
