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
import { useProjectStore } from "../../entities/Project";

interface AutoGenerateProps {}

const AutoGenerate: FC<AutoGenerateProps> = () => {
  const [options] = useState([{ name: "NLP v1.2 - 5 students per team" }]);

  const { post } = useFetchClient();

  const { getSelectedStudents } = useStudentStore();
  const { getSelectedProjects } = useProjectStore();
  const { setTeams } = useDraftTeamsStore();

  const [selected, setSelected] = useState<string | null>(null);

  const handleGenerate = async () => {
    const selectedStudents = getSelectedStudents();
    const selectedProjects = getSelectedProjects();
    if (selected) {
      const projectData = await Promise.all(
        selectedProjects.map((project) => {
          return fetch(
            process.env.SERVER_URL + "/project/" + project.slug
          ).then((res) => res.json());
        })
      );

      const result = await post("/team-builder/autogenerate", {
        users: selectedStudents,
        projects: projectData,
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
