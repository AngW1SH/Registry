"use client";
import {
  Button,
  FormCheckbox,
  FormInput,
  LoadingCircle,
  NamedBlock,
} from "@/shared/ui";
import { FC, useMemo, useState } from "react";
import { useAccountDataMutation } from "../model/useAccountDataMutation";

interface EditAccountDataProps {
  emailParam: string;
  phoneParam: string;
}

const EditAccountData: FC<EditAccountDataProps> = ({
  emailParam,
  phoneParam,
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { mutate: edit, isLoading } =
    useAccountDataMutation(setHasUnsavedChanges);

  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState(emailParam);
  const [phone, setPhone] = useState(phoneParam);

  const isSubmittable = useMemo(() => {
    return email || phone;
  }, [email, phone]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasUnsavedChanges && isSubmittable) edit({ email, phone });
  };

  console.log(hasUnsavedChanges && isSubmittable);

  return (
    <NamedBlock title={"Учётная запись"} border={false}>
      <div className="relative flex flex-col gap-y-6">
        <div className="flex">
          <p className="w-24 text-[0.9375rem] text-[#898989]">E-mail</p>
          <FormInput
            className="-mt-px w-3/4 sm:w-[calc(50%+1px)]"
            onChange={(value: string) => {
              setEmail(value);
              setHasUnsavedChanges(true);
            }}
            value={email}
            placeholder="Введите E-mail"
            id={"userAccountEmail"}
          />
        </div>
        <div className="flex">
          <p className="w-24 text-[0.9375rem] text-[#898989]">Телефон</p>
          <FormInput
            className="-mt-[2px] w-3/4 sm:w-[calc(50%+1px)]"
            onChange={(value: string) => {
              setPhone(value);
              setHasUnsavedChanges(true);
            }}
            value={phone}
            placeholder="Введите телефон"
            id={"userAccountPhone"}
          />
        </div>
        <div className="right-0 top-0 lg:absolute lg:w-1/3">
          <FormCheckbox
            label="Получать оповещения об изменении статуса проектов, в которых Вы участвуете"
            id="userProfileSubscribe"
            value={checked}
            onToggle={(value: boolean) => {
              setChecked(value);
              setHasUnsavedChanges(true);
            }}
          />
        </div>
      </div>
      <div className="pt-8" />
      {!isLoading && (
        <Button
          className={`self-start rounded-full px-14 pt-3`}
          onClick={handleSubmit}
          style={
            hasUnsavedChanges && isSubmittable
              ? {}
              : {
                  backgroundColor: "#bbb",
                }
          }
        >
          Сохранено
        </Button>
      )}
      {isLoading && (
        <div className="px-14">
          <LoadingCircle />
        </div>
      )}
    </NamedBlock>
  );
};

export default EditAccountData;
