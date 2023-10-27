import { Block, ButtonAlt } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";
import { IForm } from "../types/types";

interface FormCardProps {
  form: IForm;
}

const FormCard: FC<FormCardProps> = ({ form }) => {
  return (
    <Block className="flex justify-between rounded-xl px-11 py-12">
      <p className="w-2/3 font-medium">{form.name}</p>
      <div className="flex w-1/3 justify-end whitespace-nowrap">
        <div>
          {form.completed && (
            <>
              <h3 className="text-sm text-[#898989]">Дата прохождения</h3>
              <p className="text-[0.9375rem]">
                {form.completed.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <div className="pt-3" />
              <ButtonAlt className="-ml-3 rounded-full border px-6 py-2 text-sm">
                Пройти заново
              </ButtonAlt>
            </>
          )}
          {!form.completed && (
            <ButtonAlt className="-ml-3 mt-1 rounded-full border px-12 py-2 text-sm">
              Пройти
            </ButtonAlt>
          )}
        </div>
        <div className="pr-14" />
        <div className="h-10 w-10 min-w-[2.5rem] rounded-full">
          <div className="relative h-full w-full">
            {form.completed && (
              <Image src="/checked-circle-icon.svg" fill={true} alt="" />
            )}
            {!form.completed && (
              <Image src="/warning-circle-icon.svg" fill={true} alt="" />
            )}
          </div>
        </div>
      </div>
    </Block>
  );
};

export default FormCard;
