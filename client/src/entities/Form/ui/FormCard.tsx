import { Block, ButtonAlt } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";
import { IForm } from "../types/types";
import Link from "next/link";

interface FormCardProps {
  form: IForm;
}

const FormCard: FC<FormCardProps> = ({ form }) => {
  return (
    <Block className="relative flex flex-col justify-between rounded-xl px-6 py-12 text-center sm:px-11 sm:text-left lg:flex-row">
      <p className="pb-4 pt-12 text-xl font-medium sm:pl-16 sm:pt-0 lg:w-2/3 lg:pb-0 lg:text-base">
        {form.name}
      </p>
      <div className="flex justify-center whitespace-nowrap sm:justify-start sm:pl-16 lg:w-1/3 lg:justify-end">
        <div>
          {form.completed && (
            <div className="flex flex-col-reverse gap-x-4 sm:flex-row-reverse lg:flex-col">
              <div>
                <h3 className="text-sm text-[#898989]">Дата прохождения</h3>
                <p className="text-[0.9375rem]">
                  {form.completed.toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="pt-3" />
              <Link href={form.link}>
                <ButtonAlt className="rounded-full border px-6 py-2 text-sm lg:-ml-3">
                  Пройти заново
                </ButtonAlt>
              </Link>
            </div>
          )}
          {!form.completed && (
            <Link href={form.link}>
              <ButtonAlt className="mt-1 rounded-full border px-12 py-2 text-sm lg:-ml-3">
                Пройти
              </ButtonAlt>
            </Link>
          )}
        </div>
        <div className="hidden pr-14 lg:block" />
        <div className="absolute left-1/2 top-12 h-10 w-10 min-w-[2.5rem] -translate-x-1/2 rounded-full sm:left-10 sm:top-1/2 sm:-translate-y-1/2 lg:static lg:translate-y-0">
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
