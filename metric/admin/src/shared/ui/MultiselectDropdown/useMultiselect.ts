"use client";
import { useEffect, useState } from "react";

export const useMultiselect = (
  active: string[],
  setActive: (active: string[]) => any,
  options: string[]
) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(options);

  const toggleOption = (option: string) => {
    if (active.includes(option)) {
      setActive(active.filter((tag) => tag != option));
    } else {
      setActive([...active, option]);
    }
  };

  useEffect(() => {
    const updateSuggestions = async () => {
      const newSuggestions = options.filter((option) => option.includes(input));

      setSuggestions(newSuggestions);
    };

    updateSuggestions();
  }, [input, options]);

  return { active, suggestions, toggleOption, input, setInput };
};
