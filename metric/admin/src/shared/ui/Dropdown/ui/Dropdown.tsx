"use client";
import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionStatus } from "react-transition-group";
import { defaultStyle, transitionStyles } from "../static/transitionStyles";
import { TextInput } from "../../TextInput";

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
  const nodeRef = useRef(null);

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

  const handleSelect = (option: string) => {
    if (onChange) onChange(option);
    setOpened(false);
  };

  return (
    <div className={"relative z-9 w-full rounded-lg " + className} ref={ref}>
      <div onClick={() => setOpened(!opened)}>
        <TextInput
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
      <CSSTransition
        nodeRef={nodeRef}
        in={opened && options.length != 0}
        timeout={100}
      >
        {(state: TransitionStatus) => (
          <div
            ref={nodeRef}
            className={`absolute left-0 top-full mt-2 z-[11] flex w-min min-w-full flex-col gap-6 rounded-md bg-white px-6 py-5 shadow-center-md`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {options.map((option, index) => (
              <div
                className="flex cursor-pointer items-center"
                key={option}
                onClick={() => handleSelect(option)}
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
