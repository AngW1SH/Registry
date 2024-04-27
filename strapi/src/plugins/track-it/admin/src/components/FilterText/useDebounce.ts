import { useEffect, useRef, useState } from "react";

export const useDebounce = <Type>(state: Type, timeout: number) => {
  const [value, setValue] = useState<Type>(state);
  const timeoutID = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutID.current) clearTimeout(timeoutID.current);

    timeoutID.current = setTimeout(() => {
      setValue(state);
    }, timeout);
  }, [state]);

  return value;
};
