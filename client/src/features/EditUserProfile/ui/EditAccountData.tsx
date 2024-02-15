"use client";
import { Button, FormCheckbox, FormInput, NamedBlock } from "@/shared/ui";
import { FC, useState } from "react";

interface EditAccountDataProps {}

const EditAccountData: FC<EditAccountDataProps> = () => {
  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <NamedBlock title={"Учётная запись"} border={false}>
      <div className="relative flex flex-col gap-y-6">
        <div className="flex">
          <p className="w-24 text-[0.9375rem] text-[#898989]">E-mail</p>
          <FormInput
            className="-mt-px w-3/4 sm:w-[calc(50%+1px)]"
            onChange={setEmail}
            value={email}
            placeholder="Введите E-mail"
            id={"userAccountEmail"}
          />
        </div>
        <div className="flex">
          <p className="w-24 text-[0.9375rem] text-[#898989]">Телефон</p>
          <FormInput
            className="-mt-[2px] w-3/4 sm:w-[calc(50%+1px)]"
            onChange={setPhone}
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
            onToggle={setChecked}
          />
        </div>
      </div>
      <div className="pt-8" />
      <Button className="self-start rounded-full px-14 pt-3">Сохранить</Button>
    </NamedBlock>
  );
};

export default EditAccountData;
