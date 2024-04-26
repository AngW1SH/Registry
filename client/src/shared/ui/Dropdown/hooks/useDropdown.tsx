"use client";
import { useDebounce } from "@/shared/hooks";
import { useEffect, useState } from "react";

export const useDropdown = (
  initialSelected: string | null,
  initialOptions?: string[],
  fetchSuggestions?: (query: string) => Promise<string[]>,
) => {
  const [input, setInput] = useState("");

  const [selected, setSelected] = useState(initialSelected);

  const [options, setOptions] = useState<string[]>(initialOptions || []);
  const [suggestions, setSuggestions] = useState(options);

  const debouncedInput = useDebounce(input, 300);

  const confirmSelected = (option: string) => {
    console.log(options);
    if (options.includes(option)) {
      setSelected(option);
      setInput(option);
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
  }, [debouncedInput, options]);

  useEffect(() => {
    setOptions(initialOptions || []);
  }, [initialOptions]);

  useEffect(() => {
    asyncUpdateSuggestions();
  }, []);

  return { selected, suggestions, confirmSelected, input, setInput };
};
