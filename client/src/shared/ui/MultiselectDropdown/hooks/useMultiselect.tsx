"use client";
import { useDebounce } from "@/shared/hooks";
import { useEffect, useState } from "react";

export const useMultiselect = (
  active: string[],
  setActive: (active: string[]) => any,
  initialOptions?: string[],
  fetchSuggestions?: (query: string) => Promise<string[]>,
) => {
  const [input, setInput] = useState("");

  const [options, setOptions] = useState<string[]>(
    initialOptions || ["2 курс", "3 курс", "Магистратура"],
  );
  const [suggestions, setSuggestions] = useState(options);

  const debouncedInput = useDebounce(input, 300);

  const toggleOption = (option: string) => {
    if (active.includes(option)) {
      setActive(active.filter((tag) => tag != option));
    } else {
      setActive([...active, option]);
    }
  };

  const asyncUpdateSuggestions = async () => {
    if (!fetchSuggestions) return;

    const newSuggestions = await fetchSuggestions(debouncedInput);

    const newOptions = [
      ...options,
      ...newSuggestions.filter((suggestion) => !options.includes(suggestion)),
    ];

    setOptions(newOptions);
    setSuggestions(newSuggestions);
  };

  useEffect(() => {
    const updateSuggestions = async () => {
      const newSuggestions = options.filter((option) =>
        option.includes(debouncedInput),
      );

      setSuggestions(newSuggestions);
    };

    if (fetchSuggestions) {
      asyncUpdateSuggestions();
    } else {
      updateSuggestions();
    }
  }, [debouncedInput]);

  useEffect(() => {
    asyncUpdateSuggestions();
  }, []);

  return { active, suggestions, toggleOption, input, setInput };
};
