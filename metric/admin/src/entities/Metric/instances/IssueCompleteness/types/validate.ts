import { z } from "zod";

export const IssueCompletenessSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.object({
      completed: z.number().gte(0),
      total: z.number().gte(0),
    }),
    timestamp: z.number().transform((x) => new Date(x)),
  })
);

export type IssueCompleteness = z.infer<typeof IssueCompletenessSchema>;
