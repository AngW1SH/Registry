"use client";
import { useDebounce } from "@/shared/hooks";
import { useEffect, useState } from "react";

export const useDropdown = (
  initialSelected: string | null,
  initialOptions?: string[],
  fetchSuggestions?: (query: string) => Promise<string[]>,
) => {
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState("");

  const [selected, setSelected] = useState(initialSelected);

  const [options, setOptions] = useState<string[]>(initialOptions || []);
  const [suggestions, setSuggestions] = useState(options);

  const debouncedInput = useDebounce(input, 300);

  const confirmSelected = (option: string) => {
    if (options.includes(option)) {
      setSelected(option);
      setInput(option);
      setOpened(false);
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

  const updateSuggestions = async (options: string[]) => {
    const newSuggestions = options.filter((option) =>
      option.includes(debouncedInput),
    );

    setSuggestions(newSuggestions);
  };

  useEffect(() => {
    if (fetchSuggestions) {
      asyncUpdateSuggestions();
    } else {
      updateSuggestions(options);
    }
  }, [debouncedInput]);

  useEffect(() => {
    setOptions(initialOptions || []);

    if (initialOptions) {
      if (fetchSuggestions) {
        asyncUpdateSuggestions();
      } else {
        updateSuggestions(initialOptions || []);
      }
    } else {
      setSuggestions([]);
    }
  }, [initialOptions]);

  useEffect(() => {
    asyncUpdateSuggestions();
  }, []);

  return {
    opened,
    setOpened,
    selected,
    suggestions,
    confirmSelected,
    input,
    setInput,
  };
};
