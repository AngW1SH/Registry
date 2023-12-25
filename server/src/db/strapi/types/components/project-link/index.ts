export interface ProjectLinkStrapi {
  id: number;
  link: string;
  platform: {
    data: {
      id: number;
      attributes: {
        name: string;
      };
    };
  };
}
