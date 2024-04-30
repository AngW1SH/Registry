import { FC } from "react";
import TextField from "./TextField";
import { IMetricParam, MetricParamType } from "../../types/params";
import DurationField from "./DurationField";
import { paramData } from "../../config/paramData";
import BooleanField from "./BooleanField";

interface MetricFieldProps {
  param: IMetricParam;
  onChange: (value: IMetricParam) => void;
  className?: string;
}

const MetricField: FC<MetricFieldProps> = ({
  param,
  onChange,
  className = "",
}) => {
  const data = paramData[param.name];

  switch (param.type) {
    case MetricParamType.text: {
      return (
        <TextField
          {...param}
          {...data}
          value={param.value}
          onChange={(value) => onChange({ ...param, value: value })}
          className={className}
        />
      );
    }
    case MetricParamType.duration: {
      return (
        <DurationField
          {...param}
          {...data}
          value={param.value}
          onChange={(value) => onChange({ ...param, value: value })}
          className={className}
        />
      );
    }
    case MetricParamType.boolean: {
      return (
        <BooleanField
          {...param}
          {...data}
          value={param.value}
          onChange={(value) => onChange({ ...param, value: value })}
          className={className}
        />
      );
    }
  }

  return <div></div>;
};

export default MetricField;
