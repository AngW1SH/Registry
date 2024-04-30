import { PlatformName } from "../../entities/ImportProject";

export const componentToProvider: { [key in string]: PlatformName } = {
  "github-data.github-data": PlatformName.GitHub,
};
