import { FC } from "react";
import TextField from "./TextField";
import { IMetricParam, MetricParamType } from "../../types/params";

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
  switch (param.type) {
    case MetricParamType.text: {
      return (
        <TextField
          {...param}
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
