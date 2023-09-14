import { TagSlider } from "@/entities/Tag";
import { FC } from "react";

interface GetActiveProjectsByTagsProps {}

const GetActiveProjectsByTags: FC<GetActiveProjectsByTagsProps> = () => {
  return <TagSlider />;
};

export default GetActiveProjectsByTags;
