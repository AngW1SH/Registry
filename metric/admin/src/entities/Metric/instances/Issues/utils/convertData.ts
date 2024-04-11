import { Issues, IssuesSchema } from "../types";

export const convertData = (data: any): Issues => {
  const converted = IssuesSchema.safeParse(data);

  if (!converted.success) {
    console.log(converted.error.message);
    return [];
  }

  return converted.data;
};
