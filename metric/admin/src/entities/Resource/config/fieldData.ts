import { IResourceFieldData } from "../types/fields";

export const fieldData: { [key in string]: IResourceFieldData } = {
  apiEndpoint: {
    label: "API Endpoint",
    tooltip: "API Endpoint for metric requests",
    placeholder: "Example: https://api.github.com/org/repo",
  },
  apiKeys: {
    label: "API Keys",
    tooltip: "API Keys for metric requests",
    placeholder: "Example: ghp_UED9bpBnjdwU9vrjztzGqAKfJsZdM82LxMOu",
  },
  url: {
    label: "URL",
    tooltip: 'URL displayed in the right sidebar ("Resource Links" tab)',
    placeholder: "Example: https://github.com/org/repo",
  },
};
