import TagSlider from "./ui/TagSlider";
import TagList from "./ui/TagList";
import { staticTags } from "./static/staticTags";
import { getTagsByTagIds } from "./model/getTagsByTagIds";
import { serializeTagList } from "./model/serializeTagList";

import type { ITag } from "./types/types";

export { TagSlider, TagList, staticTags, getTagsByTagIds, serializeTagList };
export type { ITag };
