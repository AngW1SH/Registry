import { IFormResults, IFormType } from "../../types";
import { convertGoogle } from "./convertGoogle";

export const convert = (
  file: File,
  type: IFormType,
  callback: (results: IFormResults[]) => any
) => {
  switch (type) {
    case IFormType.google:
      convertGoogle(file, callback);
      break;
    default:
      return;
  }
};
