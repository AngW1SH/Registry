import { FC, useState } from "react";
import { TextInput } from "../../TextInput";
import { Dropdown } from "../../Dropdown";
import { DurationValue, UnitOfTime } from "../types";
import { unitsOfTimeArray } from "../utils/unitsOfTimeArray";

interface DurationProps {
  value: DurationValue;
  onChange: (value: DurationValue) => void;
}

const Duration: FC<DurationProps> = ({ value, onChange }) => {
  const [numberValue, setNumberValue] = useState(value.number);
  const [unitOfTime, setUnitOfTime] = useState(value.unitOfTime);

  const handleChange = (value: DurationValue) => {
    setNumberValue(value.number);
    setUnitOfTime(value.unitOfTime);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex gap-5">
      <TextInput
        value={numberValue}
        className="w-1/2"
        placeholder={"Number"}
        onChange={(e) => handleChange({ number: +e.target.value, unitOfTime })}
      />
      <Dropdown
        value={unitOfTime}
        onChange={(value) =>
          handleChange({ number: numberValue, unitOfTime: value as UnitOfTime })
        }
        placeholder="Unit of Time"
        namePrefix="unitOfTime"
        options={unitsOfTimeArray}
      />
    </div>
  );
};

export default Duration;
