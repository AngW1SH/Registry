export interface NamedFileStrapi {
  id: number;
  name: string;
  file: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        mime: string;
        size: number;
      };
    } | null;
  };
}