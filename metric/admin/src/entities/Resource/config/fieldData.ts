import { IResourceFieldData } from "../types/fields";

export const fieldData: { [key in string]: IResourceFieldData } = {
  apiEndpoint: {
    label: "API Endpoint",
    tooltip: "API Endpoint",
    placeholder: "https://api.github.com",
  },
  apiKeys: {
    label: "API Keys",
    tooltip: "API Keys",
    placeholder: "Enter your API Key",
  },
  url: {
    label: "URL",
    tooltip: "URL",
    placeholder: "https://github.com",
  },
};
