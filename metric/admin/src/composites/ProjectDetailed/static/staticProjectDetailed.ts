import { IProjectDetailed, IResourceDetailed } from "..";

const staticResourceDetailed: IResourceDetailed = {
  id: "1",
  name: "AngW1SH/Registry",
  project: "333",
  platform: "Github",
  metrics: [
    {
      id: "2",
      name: "test",
      params: [],
      data: [],
      resource: "1",
    },
  ],
  params: [],
};

export const staticProjectDetailed: IProjectDetailed = {
  id: "333",
  name: "Реестр проектов клинической практики СПбГУ",
  resources: [staticResourceDetailed],
};
