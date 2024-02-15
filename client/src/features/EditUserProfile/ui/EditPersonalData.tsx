"use client";
import { Button, FormInput, NamedBlock } from "@/shared/ui";
import { FC, useState } from "react";

interface EditPersonalDataProps {}

/*

        <FormInput
          label="Дата рождения"
          id="userProfileBirthday"
          className="order-4 w-3/4 sm:order-3 sm:w-4/12"
          value={"20.02.2002"}
        />
        <FormInput
          label="Город"
          id="userProfileHometown"
          className="order-5 w-3/4 sm:w-4/12"
          value={"Санкт-Петербург"}
          readOnly={true}
        />
*/

const EditPersonalData: FC<EditPersonalDataProps> = () => {
  const [fullName, setFullName] = useState({
    surname: "",
    name: "",
    patronymic: "",
  });

  return (
    <NamedBlock title={"Личные данные"} border={false}>
      <div className="flex flex-wrap items-end justify-between gap-y-7">
        <FormInput
          className="order-1 w-full sm:w-[calc(50%+1px)]"
          value={fullName.surname}
          placeholder="Фамилия"
          onChange={(value: string) =>
            setFullName((prev) => ({ ...prev, surname: value }))
          }
        />
        <FormInput
          className="order-2 w-full sm:w-[calc(50%+1px)]"
          value={fullName.name}
          placeholder="Имя"
          onChange={(value: string) =>
            setFullName((prev) => ({ ...prev, name: value }))
          }
        />
        <FormInput
          className="order-3 w-full sm:order-4 sm:w-[calc(50%+1px)]"
          value={fullName.patronymic}
          placeholder="Отчество"
          onChange={(value: string) =>
            setFullName((prev) => ({ ...prev, patronymic: value }))
          }
        />
      </div>
      <div className="pt-8" />
      <Button className="self-start rounded-full px-14 pt-3">Сохранить</Button>
    </NamedBlock>
  );
};

export default EditPersonalData;
