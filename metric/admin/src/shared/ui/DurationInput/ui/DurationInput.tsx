import { FC, useEffect, useState } from "react";
import { TextInput } from "../../TextInput";
import { Dropdown } from "../../Dropdown";
import { DurationValue } from "../types";
import { unitsOfTimeArray } from "../utils/unitsOfTimeArray";

interface DurationProps {
  value: DurationValue;
  onChange: (value: DurationValue) => void;
}

const Duration: FC<DurationProps> = ({ value, onChange }) => {
  const [numberValue, setNumberValue] = useState(value.number);
  const [unitOfTime, setUnitOfTime] = useState(value.unitOfTime);

  useEffect(() => {
    onChange({
      number: numberValue,
      unitOfTime: unitOfTime,
    });
  }, [numberValue, unitOfTime]);

  return (
    <div className="flex gap-5">
      <TextInput
        value={numberValue}
        className="w-1/2"
        placeholder={"Number"}
        onChange={(e) => {
          setNumberValue(Number(e.target.value));
        }}
      />
      <Dropdown
        value={unitOfTime}
        onChange={setUnitOfTime as any}
        placeholder="Unit of Time"
        namePrefix="unitOfTime"
        options={unitsOfTimeArray}
      />
    </div>
  );
};

export default Duration;
