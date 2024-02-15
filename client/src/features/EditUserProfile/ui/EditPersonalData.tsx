"use client";
import { Button, FormInput, LoadingCircle, NamedBlock } from "@/shared/ui";
import { FC, useMemo, useState } from "react";
import { usePersonalDataMutation } from "../model/usePersonalDataMutation";

interface EditPersonalDataProps {
  fullNameParam: {
    surname: string;
    name: string;
    patronymic: string;
  };
}

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

const EditPersonalData: FC<EditPersonalDataProps> = ({ fullNameParam }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { mutate: edit, isLoading } =
    usePersonalDataMutation(setHasUnsavedChanges);

  const [fullName, setFullName] = useState(fullNameParam);

  const updateFullName = (
    key: "surname" | "name" | "patronymic",
    value: string,
  ) => {
    setHasUnsavedChanges(true);
    setFullName((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasUnsavedChanges && isSubmittable) edit({ fullName });
  };

  const isSubmittable = useMemo(() => {
    return fullName.name || fullName.surname || fullName.patronymic;
  }, [fullName]);

  return (
    <NamedBlock title={"Личные данные"} border={false}>
      <div className="flex flex-wrap items-end justify-between gap-y-7">
        <FormInput
          className="order-1 w-full sm:w-[calc(50%+1px)]"
          value={fullName.surname}
          placeholder="Фамилия"
          onChange={(value: string) => updateFullName("surname", value)}
        />
        <FormInput
          className="order-2 w-full sm:w-[calc(50%+1px)]"
          value={fullName.name}
          placeholder="Имя"
          onChange={(value: string) => updateFullName("name", value)}
        />
        <FormInput
          className="order-3 w-full sm:order-4 sm:w-[calc(50%+1px)]"
          value={fullName.patronymic}
          placeholder="Отчество"
          onChange={(value: string) => updateFullName("patronymic", value)}
        />
      </div>
      <div className="pt-8" />
      {!isLoading &&
        (hasUnsavedChanges && isSubmittable ? (
          <Button
            className={`self-start rounded-full px-14 pt-3`}
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        ) : (
          <Button
            className={`self-start rounded-full px-14 pt-3`}
            style={{
              backgroundColor: "#bbb",
            }}
            onClick={handleSubmit}
          >
            Сохранено
          </Button>
        ))}
      {isLoading && (
        <div className="px-14">
          <LoadingCircle />
        </div>
      )}
    </NamedBlock>
  );
};

export default EditPersonalData;
