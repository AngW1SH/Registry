"use client";
import { IUser } from "@/entities/User";
import { useToggleOpen } from "@/shared/hooks";
import Image from "next/image";
import { FC, ReactElement, ReactNode, cloneElement, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface MemberInspectProps {
  edit: ReactElement | null;
  data: {
    id: number;
    name: string;
    role: string;
    label: string | null;
    selected: boolean;
  };
}

const MemberInspect: FC<MemberInspectProps> = ({ edit, data }) => {
  const editRef = useRef<HTMLDivElement>(null);

  const { opened, toggleOpened, styles } = useToggleOpen(editRef, edit);

  const EditWithOnSuccess = edit
    ? cloneElement(edit, { onSuccess: toggleOpened })
    : null;

  return (
    <div>
      <div
        className={
          "relative flex flex-col items-center py-3 sm:flex-row sm:py-5 " +
          (data.label ? "pt-8" : "")
        }
      >
        <p className="sm:w-min sm:min-w-[40%]">{data.role}</p>
        <p className="whitespace-nowrap pl-2 pt-1 font-bold uppercase sm:pt-0 sm:font-medium md:text-lg">
          {data.name}
        </p>
        {data.label !== null && (
          <p className="absolute left-0 top-2 w-full text-center text-[0.9375rem] text-primary sm:static sm:ml-10 sm:w-auto sm:text-left">
            Представитель команды
          </p>
        )}
        {edit && (
          <div
            onClick={toggleOpened}
            className="absolute right-0 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer"
          >
            <Image src="/edit-icon.svg" fill={true} alt="Редактировать" />
          </div>
        )}
      </div>
      <Transition in={opened} timeout={150}>
        {(state: TransitionStatus) => (
          <div
            className={`relative ${
              state == "entered" ? "overflow-visible" : "overflow-hidden"
            }`}
          >
            <div
              className="relative"
              style={{
                ...styles.default,
                ...styles.transition[state],
              }}
            >
              <div ref={editRef} className="border-t border-[#ddd] py-6">
                {EditWithOnSuccess}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default MemberInspect;
