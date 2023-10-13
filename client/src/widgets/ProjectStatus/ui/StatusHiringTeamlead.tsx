"use client";
import { Button, Dropdown, FileUpload } from "@/shared/ui";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface StatusHiringTeamleadProps {}

const StatusHiringTeamlead: FC<StatusHiringTeamleadProps> = () => {
  const [isApplying, setIsApplying] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>([]);

  return (
    <div className="my-auto w-full overflow-hidden lg:h-full lg:w-full lg:py-4 xl:py-0">
      <div
        className="flex h-full transition-transform"
        style={{
          transform: isApplying ? "translate(-100%, 0)" : "",
        }}
      >
        <div className="flex h-full min-w-full flex-col">
          <h2 className="text-center text-3xl text-primary lg:text-left xl:text-4xl">
            Открыта запись
            <br className="hidden lg:block" /> на проект
          </h2>
          <div className="pt-7" />
          <div className="h-px w-full bg-black" />
          <div className="pt-7" />
          <div className="flex">
            <p className="w-1/2">Число поданных на проект заявок</p>
            <p className="flex w-1/2 items-center justify-center text-5xl font-medium">
              3
            </p>
          </div>
          <div className="pt-14 lg:pt-7" />
          <Button
            className="mt-auto block self-center px-9"
            onClick={() => setIsApplying(true)}
          >
            Подать заявку
          </Button>
        </div>
        <div className="flex min-w-full flex-col lg:h-full">
          <button
            className="relative h-6 w-6"
            onClick={() => setIsApplying(false)}
          >
            <Image
              src="/link-arrow-black-alt.svg"
              className="rotate-180"
              fill={true}
              alt="Вернуться к числу заявок"
            />
          </button>
          <div className="pt-10" />
          <Dropdown
            value={selected}
            onChange={setSelected}
            placeholder="Команда"
            namePrefix="team"
            options={["Команда 1", "Команда 2"]}
          />
          <div className="pt-7" />
          <FileUpload
            name="team-document"
            label="Презентация команды"
            onChange={setSelectedFiles}
          />
          <Button className="mt-auto block self-center px-9">Отправить</Button>
        </div>
      </div>
    </div>
  );
};

export default StatusHiringTeamlead;