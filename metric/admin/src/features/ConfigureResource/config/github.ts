import { ResourceFieldType } from "@/entities/Resource";
import { ResourceConfig } from "../types";

export const githubConfig: ResourceConfig = {
  name: "GitHub",
  data: [
    {
      prop: "apiEndpoint",
      label: "API Endpoint",
      type: ResourceFieldType.text,
      placeholder: "https://api.github.com",
    },
    {
      prop: "apiKeys",
      label: "API Keys",
      type: ResourceFieldType.textArray,
      placeholder: "Enter your API Key",
    },
  ],
};
