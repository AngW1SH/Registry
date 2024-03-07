import { ResourceConfig, fieldType } from "../types";

export const githubConfig: ResourceConfig = {
  name: "GitHub",
  data: [
    {
      prop: "apiEndpoint",
      label: "API Endpoint",
      type: fieldType.text,
      placeholder: "https://api.github.com",
    },
    {
      prop: "apiKeys",
      label: "API Keys",
      type: fieldType.textArray,
      placeholder: "Enter your API Key",
    },
  ],
};
