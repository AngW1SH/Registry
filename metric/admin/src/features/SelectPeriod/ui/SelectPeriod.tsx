import { FC, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { ru } from "date-fns/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./SelectPeriodStyles.css";

import { useDateRange } from "../hooks/useDateRange";
import { useAppDispatch } from "@/app/store";
import { metricSlice } from "@/entities/Metric";

interface SelectPeriodProps {}

const SelectPeriod: FC<SelectPeriodProps> = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { state, setState }: any = useDateRange(ref);

  useEffect(() => {
    const end = state[0].endDate ? new Date(state[0].endDate) : null;
    end?.setHours(23, 59, 59, 999);

    dispatch(
      metricSlice.actions.setCalendar({
        start: state[0].startDate?.toJSON() || null,
        end: end?.toJSON() || null,
      })
    );
  }, [state]);

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
