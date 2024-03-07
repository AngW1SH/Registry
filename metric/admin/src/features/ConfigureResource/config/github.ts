import { ResourceFieldType } from "@/entities/Resource";
import { ResourceConfig } from "../types";

export const githubConfig: ResourceConfig = {
  name: "GitHub",
  data: [
    {
      prop: "apiEndpoint",
      label: "API Endpoint",
      type: ResourceFieldType.text,
      tooltip: "Set API Endpoint",
      placeholder: "https://api.github.com",
    },
    {
      prop: "apiKeys",
      label: "API Keys",
      tooltip: "Set API Keys",
      type: ResourceFieldType.textArray,
      placeholder: "Enter your API Key",
    },
  ],
};
