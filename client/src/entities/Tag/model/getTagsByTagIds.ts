import { ITag } from "../types/types";

/*
The function assumes allTags contains all the tags with tagIds of the first argument
*/
export const getTagsByTagIds = (tagIds: number[], allTags: ITag[]) => {
  return tagIds.map((tagId) => {
    return allTags.find((tag) => tag.id == tagId)!;
  });
};
