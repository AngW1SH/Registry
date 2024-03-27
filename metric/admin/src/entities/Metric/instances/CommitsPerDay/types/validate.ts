import { z } from "zod";

export const CommitsPerDaySchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.object({
      value: z.number().gte(0),
    }),
    timestamp: z.number().transform((x) => new Date(x)),
  })
);

export type CommitsPerDay = z.infer<typeof CommitsPerDaySchema>;
