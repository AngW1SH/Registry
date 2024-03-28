import { z } from "zod";

export const TotalCommitsSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.array(
      z.object({
        name: z.string(),
        value: z.number().gte(0),
      })
    ),
    timestamp: z.number().transform((x) => new Date(x)),
  })
);

export type TotalCommits = z.infer<typeof TotalCommitsSchema>;
