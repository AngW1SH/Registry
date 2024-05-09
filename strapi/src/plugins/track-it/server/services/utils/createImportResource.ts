import {
  IResourceField,
  ImportResource,
  ResourceFieldType,
} from "../../entities/ImportProject";
import { componentToProvider } from "./componentToProvider";

interface GenericProvider {
  id: number;
}

interface GithubProvider extends GenericProvider {
  __component: "github-data.github-data";
  apiKey: string;
  organization: string;
  repository: string;
}

type Provider = GithubProvider;

export const createImportResource = (provider: Provider): ImportResource => {
  switch (provider.__component) {
    case "github-data.github-data":
      return createGithubImportResource(provider);
    default:
      throw new Error(`Unknown provider: ${provider.__component}`);
  }
};

const createGithubImportResource = (
  provider: GithubProvider
): ImportResource => {
  const params: IResourceField[] = [
    {
      prop: "apiKeys",
      type: ResourceFieldType.textArray,
      value: [provider.apiKey],
    },
    {
      prop: "url",
      type: ResourceFieldType.text,
      value: `https://api.github.com/repos/${provider.organization}/${provider.repository}/`,
    },
    {
      prop: "apiEndpoint",
      type: ResourceFieldType.text,
      value: `https://api.github.com/repos/${provider.organization}/${provider.repository}/`,
    },
  ];

  return {
    name: provider.organization + "/" + provider.repository,
    platform: componentToProvider[provider.__component],
    params: JSON.stringify(params),
  };
};
