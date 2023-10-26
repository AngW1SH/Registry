import { FC } from "react";

interface UserFormsEmptyProps {}

const UserFormsEmpty: FC<UserFormsEmptyProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Анкеты</h2>
      <div className="pt-10" />
      <p className="text-[#898989]">Пока нет доступных анкет</p>
    </div>
  );
};

export default UserFormsEmpty;
