"use client";
import { FormCheckbox, NamedBlock } from "@/shared/ui";
import { FC, useState } from "react";

interface EditAccountDataProps {}

const EditAccountData: FC<EditAccountDataProps> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <NamedBlock title={"Учётная запись"} border={false}>
      <div className="relative flex flex-col gap-y-6">
        <div className="flex">
          <p className="w-24 text-[0.9375rem] text-[#898989]">E-mail</p>
          <p>st087812@student.spbu.ru</p>
        </div>
        <div className="flex">
          <p className="w-24 text-[0.9375rem] text-[#898989]">Телефон</p>
          <p>+7 905 220 99 99</p>
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
    </NamedBlock>
  );
};

export default EditAccountData;
