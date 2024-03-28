import { z } from "zod";

export const TotalCommitsSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.object({
      value: z.number().gte(0),
    }),
    timestamp: z.number().transform((x) => new Date(x)),
  })
);

export type TotalCommits = z.infer<typeof TotalCommitsSchema>;
