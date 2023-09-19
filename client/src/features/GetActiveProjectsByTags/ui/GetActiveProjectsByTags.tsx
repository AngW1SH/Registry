import { ITag, TagSlider } from "@/entities/Tag";
import { FC } from "react";

interface GetActiveProjectsByTagsProps {
  tags: ITag[];
}

const GetActiveProjectsByTags: FC<GetActiveProjectsByTagsProps> = async ({
  tags,
}) => {
  return <TagSlider tags={tags} />;
};

export default GetActiveProjectsByTags;
