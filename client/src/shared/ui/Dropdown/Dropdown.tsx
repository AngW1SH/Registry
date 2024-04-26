"use client";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionStatus } from "react-transition-group";
import { defaultStyle, transitionStyles } from "./static/transitionStyles";

interface DropdownProps {
  namePrefix: string;
  options: string[];
  placeholder?: string;
  value: string | null;
  className?: string;
  onChange: (active: string) => any;
}

const Dropdown: FC<DropdownProps> = ({
  namePrefix,
  options,
  placeholder,
  className = "",
  onChange,
  value = "",
}) => {
  const [opened, setOpened] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current) {
        if (
          e.target instanceof HTMLElement &&
          !ref.current.contains(e.target)
        ) {
          setOpened(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref.current]);

  useEffect(() => {
    if (onChange && selected) onChange(selected);
    setOpened(false);
  }, [selected]);

  return (
    <div className={"relative w-full border-b pb-2 " + className} ref={ref}>
      <div
        onClick={() => setOpened(!opened)}
        className={`relative cursor-pointer pr-12 after:absolute after:right-5 ${
          opened ? "after:top-[calc(50%-6px)]" : "after:top-[calc(50%-9px)]"
        } ${
          opened ? "after:rotate-90" : "after:rotate-[270deg]"
        } after:h-[14px] after:w-[10px] after:bg-[url('/arrow-right-black.svg')] after:bg-contain after:bg-no-repeat`}
      >
        <input
          onClick={(e) => {
            e.stopPropagation();
            setOpened(true);
          }}
          value={value || ""}
          type="text"
          readOnly={true}
          placeholder={placeholder || ""}
          className="w-full outline-none"
        />
      </div>
      <CSSTransition in={opened && options.length != 0} timeout={100}>
        {(state: TransitionStatus) => (
          <div
            className={`absolute left-0 top-full z-10 mt-2 flex w-min min-w-full flex-col gap-6 rounded-md bg-white px-6 py-5 shadow-center-md`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {options.map((option, index) => (
              <div
                className="flex cursor-pointer items-center"
                key={option}
                onClick={() => setSelected(option)}
              >
                <input
                  type="checkbox"
                  name={namePrefix + "-" + index}
                  className="hidden"
                />
                <label
                  className="cursor-pointer pl-3"
                  htmlFor={namePrefix + "-" + index}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
