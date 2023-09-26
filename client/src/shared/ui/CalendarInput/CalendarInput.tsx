"use client";
import Image from "next/image";
import { FC, useState, useEffect, useRef, useCallback } from "react";
import { DateRange } from "react-date-range";
import { ru } from "date-fns/locale";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./CalendarStyles.css";

/*
Todo: 
    - Animations
    - Move the calendar up or down to be fully visible when possible
*/

interface CalendarInputProps {
  className?: string;
  placeholder?: string;
  onChange?: (startDate: Date | null, endDate: Date | null) => any;
}

const CalendarInput: FC<CalendarInputProps> = ({
  className = "",
  placeholder = "",
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  const [state, setState]: any = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const formatDate = useCallback((start: Date | null, end: Date | null) => {
    let result = "";

    if (start)
      result +=
        "с " +
        start.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
    if (end)
      result +=
        " по " +
        end.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

    return result.trim();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof HTMLElement &&
        !ref.current.contains(e.target)
      ) {
        setOpened(false);
      }
    };

    if (ref.current) {
      window.addEventListener("click", handleClickOutside);

      const handleDeleteStart = (e: MouseEvent) => {
        setState((prevState: any) => [{ ...prevState[0], startDate: null }]);
      };

      const handleDeleteEnd = (e: MouseEvent) => {
        setState((prevState: any) => [{ ...prevState[0], endDate: null }]);
      };

      const datesContainer = ref.current.querySelector(".rdrDateDisplay");

      if (datesContainer) {
        if (datesContainer.children[0]) {
          const deleteStart = document.createElement("div");
          deleteStart.classList.add("rdrDateInput__Delete");
          deleteStart.addEventListener("click", handleDeleteStart);
          datesContainer.children[0].appendChild(deleteStart);
        }

        if (datesContainer.children[1]) {
          const deleteEnd = document.createElement("div");
          deleteEnd.classList.add("rdrDateInput__Delete");
          deleteEnd.addEventListener("click", handleDeleteEnd);
          datesContainer.children[1].appendChild(deleteEnd);
        }
      }
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (onChange) onChange(state[0].startDate, state[0].endDate);
  }, [state]);

  return (
    <div className={"relative " + className} ref={ref}>
      <div
        className="flex cursor-pointer items-center justify-between gap-4"
        onClick={() => setOpened((prev) => !prev)}
      >
        <input
          readOnly
          className="outline-none"
          placeholder={placeholder}
          value={
            state[0].startDate || state[0].endDate
              ? formatDate(state[0].startDate, state[0].endDate)
              : ""
          }
        />
        <div className="relative h-4 w-4 xl:h-5 xl:w-5">
          <Image src="/calendar-icon-gray.svg" alt="" fill={true} />
        </div>
      </div>
      <div
        className="absolute left-[calc(50%-170px)] top-[calc(100%+10px)] z-[10000] bg-white"
        style={{ display: opened ? "block" : "none" }}
      >
        <DateRange
          editableDateInputs={false}
          startDatePlaceholder="Начало"
          endDatePlaceholder="Конец"
          onChange={(item) => setState([item.selection])}
          locale={ru}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
    </div>
  );
};

export default CalendarInput;
