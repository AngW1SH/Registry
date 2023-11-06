export interface NamedFileStrapi {
  id: number;
  name: string;
  date: string;
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
