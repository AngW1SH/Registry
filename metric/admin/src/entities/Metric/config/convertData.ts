import { z } from "zod";

export const convertData = <T extends Array<any>>(
  schema: z.Schema<T>,
  data: any
): z.infer<z.Schema<T>> => {
  const converted = schema.safeParse(data);

  if (!converted.success) {
    console.log(converted.error.message);
    return [] as any;
  }

  return converted.data;
};
