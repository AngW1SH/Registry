export type Category = ImageCategory | DetailedCategory;

export type ImageCategory = {
  type: "image";
  name: string;
  link: string;
  image: string;
  projectsCount: number;
};

export type DetailedCategory = {
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
