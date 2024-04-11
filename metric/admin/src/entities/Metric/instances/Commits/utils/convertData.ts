import { Commits, CommitsSchema } from "../types";

export const convertData = (data: any): Commits => {
  const converted = CommitsSchema.safeParse(data);

  if (!converted.success) {
    console.log(converted.error.message);
    return [];
  }

  return converted.data;
};
