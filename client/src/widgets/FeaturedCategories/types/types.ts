export type CategoryCard = CategoryCardWithImage | CategoryCardDetailed;

export type CategoryCardWithImage = {
  type: "image";
  name: string;
  link: string;
  image: string;
  projectsCount: number;
};

export type CategoryCardDetailed = {
  type: "detailed";
  showMore: boolean;
  name: string;
  link: string;
  tags: TagInCategory[];
};

export type TagInCategory = {
  id: string;
  name: string;
  projectsCount: number;
};
