import React, { FC, useEffect, useMemo, useState } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useProjectStore } from "../../entities/Project";

interface ProjectSelectProps {}

const ProjectSelect: FC<ProjectSelectProps> = () => {
  const [selected, setSelected] = useState([]);

  const {
    projects,
    fetch: fetchProjects,
    getSelectedProjects,
    selectedProjectIds,
    setSelectedProjects,
  } = useProjectStore();

  const selectedProjects = useMemo(getSelectedProjects, [
    selectedProjectIds,
    projects,
  ]);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <MultiSelect
      value={selectedProjects.map((project) => project.name)}
      onChange={setSelectedProjects}
      label="Projects"
      customizeContent={(values: string[]) =>
        values.length + " projects selected"
      }
      required
      placeholder="Select students"
    >
      {projects.map((project) => (
        <MultiSelectOption value={project.name}>
          {project.name}
        </MultiSelectOption>
      ))}
    </MultiSelect>
  );
};

export default ProjectSelect;
