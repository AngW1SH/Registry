import React, { FC, useMemo } from "react";
import { MultiSelectNested } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form/model";

interface FormFieldSelectProps {}

const FormFieldSelect: FC<FormFieldSelectProps> = () => {
  const { displayedFields, fields, setDisplayedFields } = useFormStore();

  const options = useMemo(() => {
    return fields?.map((field) => {
      if (field.type == "GRID")
        return {
          label: field.question,
          children: field.rows.map((row, index) => ({
            value: row,
            label: row,
          })),
        };

      return {
        label: field.question,
        value: field.question,
      };
    });
  }, [fields]);

  return (
    <MultiSelectNested
      label="Displayed form fields"
      required
      value={displayedFields || []}
      onChange={setDisplayedFields}
      onClear={() => setDisplayedFields([])}
      placeholder="Select form fields"
      customizeContent={(values: string[]) =>
        displayedFields ? displayedFields.length + " questions selected" : ""
      }
      options={options}
    ></MultiSelectNested>
  );
};

export default FormFieldSelect;
