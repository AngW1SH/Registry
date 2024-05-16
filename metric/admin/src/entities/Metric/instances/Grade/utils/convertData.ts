import { Grade, GradeSchema } from "../types";

export const convertData = (data: any): Grade => {
  const converted = GradeSchema.safeParse(data);

  if (!converted.success) {
    console.log(converted.error.message);
    return [];
  }

  return converted.data;
};
