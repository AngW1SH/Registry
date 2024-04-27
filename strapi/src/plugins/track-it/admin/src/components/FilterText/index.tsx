import React, { FC, MouseEvent, ReactNode, useState } from "react";

import { Field, Flex, FieldLabel, FieldInput } from "@strapi/design-system";

const FilterText = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Field name="email">
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>Search</FieldLabel>
        <FieldInput
          name="filterText"
          type="text"
          placeholder="Enter project name, description, etc."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Flex>
    </Field>
  );
};

export default FilterText;
