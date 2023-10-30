import { SendNewRequest } from "@/features/SendNewRequest";
import { Block } from "@/shared/ui";
import { FC } from "react";

interface NewRequestProps {}

const NewRequest: FC<NewRequestProps> = () => {
  return (
    <Block className="rounded-2xl px-11 py-10">
      <h2 className="text-xl font-semibold">Подать новую заявку</h2>
      <div className="pt-10" />
      <SendNewRequest />
    </Block>
  );
};

export default NewRequest;
