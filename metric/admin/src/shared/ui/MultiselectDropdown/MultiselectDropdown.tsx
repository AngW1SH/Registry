"use client";
import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionStatus } from "react-transition-group";
import { defaultStyle, transitionStyles } from "./transitionStyles";
import { useMultiselect } from "./useMultiselect";
import { CheckIcon } from "../Icons";

interface MultiselectDropdownProps {
  namePrefix?: string;
  options: string[];
  value: string[];
  labels?: string[];
  placeholder?: string;
  className?: string;
  onChange: (active: string[]) => any;
}

const MultiselectDropdown: FC<MultiselectDropdownProps> = ({
  options,
  placeholder,
  className = "",
  onChange,
  value,
  namePrefix = "",
}) => {
  const [opened, setOpened] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const {
    active: activeTags,
    suggestions,
    toggleOption,
    input,
    setInput,
  } = useMultiselect(value, onChange, options);

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

  return (
    <div className={"relative w-full " + className} ref={ref}>
      <div
        onClick={() => setOpened(!opened)}
        className={`relative cursor-pointer after:absolute after:right-5 ${
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
          type="text"
          placeholder={placeholder}
          className="w-full p-4 rounded-lg outline-none bg-background"
        />
      </div>
      <CSSTransition in={opened && suggestions.length != 0} timeout={100}>
        {(state: TransitionStatus) => (
          <div
            className={`absolute left-0 top-full z-10 mt-2 flex w-min min-w-full flex-col gap-2 rounded-md bg-white px-6 py-5 shadow-center-md`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {suggestions.map((option, index) => (
              <div
                className="flex cursor-pointer items-center"
                key={option}
                onClick={() => toggleOption(option)}
              >
                <input
                  type="checkbox"
                  name={namePrefix + "-" + index}
                  className="hidden"
                />
                <div
                  className={`flex h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] items-center justify-center rounded-sm border border-[#a1a1a1]`}
                >
                  {activeTags.includes(option) && (
                    <CheckIcon height={12} width={14} />
                  )}
                </div>
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

export default MultiselectDropdown;
