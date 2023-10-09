import { ITag } from "../types/types";

export const serializeTagList = (tags: ITag[]) => {
  tags.sort((a, b) => (a.name > b.name ? 1 : -1));
  return tags.reduce((acc, cur) => {
    return acc + cur.name;
  }, "");
};
