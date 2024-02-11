import { RefObject, useEffect, useState } from "react";
import { DateObject } from "../types";
import { addRangeClearButtons } from "../utils/addDateRangeClearButtons";

export const useDateRange = (ref: RefObject<HTMLElement>) => {
  const [state, setState] = useState<DateObject[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (ref.current) {
      const handleDeleteStart = () => {
        setState((prevState: DateObject[]) => [
          { ...prevState[0], startDate: null },
        ]);
      };

      const handleDeleteEnd = () => {
        setState((prevState: any) => [{ ...prevState[0], endDate: null }]);
      };

      addRangeClearButtons(ref.current, handleDeleteStart, handleDeleteEnd);
    }
  }, [ref]);

  return { state, setState };
};
