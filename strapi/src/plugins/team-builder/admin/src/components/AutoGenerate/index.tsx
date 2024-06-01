import React, { FC, useMemo, useState } from "react";
import { HalfWidthLargeScreen } from "./styles";
import {
  Flex,
  Button,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
import { useStudentStore } from "../../entities/Student";
import { useFetchClient } from "@strapi/helper-plugin";
import { useDraftTeamsStore } from "../../entities/Team/model";

interface AutoGenerateProps {}

const AutoGenerate: FC<AutoGenerateProps> = () => {
  const [options, setOptions] = useState([
    { name: "NLP v1.2 - 5 students per team" },
  ]);

  const { post } = useFetchClient();

  const { selectedStudentIds, getSelectedStudents } = useStudentStore();
  const { setTeams } = useDraftTeamsStore();

  const [selected, setSelected] = useState<string | null>(null);

  const handleGenerate = async () => {
    const selectedStudents = getSelectedStudents();
    if (selected) {
      const result = await post("/team-builder/autogenerate", {
        users: selectedStudents,
      });

      if (result.status == 200 && result.data) {
        setTeams(result.data);
      }
    }
  };

  return (
    <Flex alignItems="flex-end" justifyContent="space-between">
      <HalfWidthLargeScreen>
        <SingleSelect
          label="Algorithm"
          required
          placeholder="Select an algorithm"
          value={selected}
          onChange={setSelected}
        >
          {options.map((option) => (
            <SingleSelectOption value={option.name}>
              {option.name}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      </HalfWidthLargeScreen>
      <HalfWidthLargeScreen>
        <Button
          fullWidth={true}
          onClick={handleGenerate}
          variant="secondary"
          size="L"
        >
          AutoGenerate
        </Button>
      </HalfWidthLargeScreen>
    </Flex>
  );
};

export default AutoGenerate;
