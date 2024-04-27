import React, { FC, MouseEvent, ReactNode, useEffect, useState } from "react";

import { Field, Flex, FieldLabel, FieldInput } from "@strapi/design-system";
import { useDebounce } from "./useDebounce";
import { useProjectStore } from "../../entities/Project";

const FilterText = () => {
  const { setFilter } = useProjectStore();

  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(value, 300);

  useEffect(() => {
    setFilter(debouncedValue);
  }, [debouncedValue]);

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
