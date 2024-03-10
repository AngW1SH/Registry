import { FC } from "react";
import TextField from "./TextField";
import { IMetricParam, MetricParamType } from "../../types/params";

interface MetricFieldProps {
  param: IMetricParam;
  onChange: (value: IMetricParam) => void;
}

const MetricField: FC<MetricFieldProps> = ({ param, onChange }) => {
  switch (param.type) {
    case MetricParamType.text: {
      return (
        <TextField
          {...param}
          value={param.value}
          onChange={(value) => onChange({ ...param, value: value })}
        />
      );
    }
  }

  return <div></div>;
};

export default MetricField;
