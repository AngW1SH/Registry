import { FC, useRef } from "react";
import { DateRange } from "react-date-range";
import { ru } from "date-fns/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./SelectPeriodStyles.css";

import { useDateRange } from "../hooks/useDateRange";

interface SelectPeriodProps {}

const SelectPeriod: FC<SelectPeriodProps> = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { state, setState }: any = useDateRange(ref);

  return (
    <div ref={ref}>
      <DateRange
        editableDateInputs={false}
        startDatePlaceholder="Начало"
        endDatePlaceholder="Конец"
        rangeColors={["#551fff"]}
        onChange={(item) => setState([item.selection])}
        locale={ru}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
};

export default SelectPeriod;
