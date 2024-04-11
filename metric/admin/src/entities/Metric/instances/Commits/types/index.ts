import { IGenericMetric, MetricName } from "@/entities/Metric/types";
import { z } from "zod";

export interface CommitsMetric extends IGenericMetric {
  name: MetricName.Commits;
  data: Commits;
}

export const CommitsSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.object({
      sha: z.string(),
      node_id: z.string(),
      commit: z.object({
        author: z.object({
          name: z.string(),
          email: z.string(),
          date: z.string(),
        }),
        committer: z.object({
          name: z.string(),
          email: z.string(),
          date: z.string(),
        }),
        message: z.string(),
        tree: z.object({
          sha: z.string(),
          url: z.string(),
        }),
        url: z.string(),
        comment_count: z.number().gte(0),
        verification: z.object({
          verified: z.boolean(),
          reason: z.string(),
        }),
      }),
      url: z.string(),
      html_url: z.string(),
      comments_url: z.string(),
      author: z.object({
        login: z.string(),
        id: z.number().gte(0),
        node_id: z.string(),
        avatar_url: z.string(),
        gravatar_id: z.string(),
        url: z.string(),
        html_url: z.string(),
        followers_url: z.string(),
        following_url: z.string(),
        gists_url: z.string(),
        starred_url: z.string(),
        subscriptions_url: z.string(),
        organizations_url: z.string(),
        repos_url: z.string(),
        events_url: z.string(),
        received_events_url: z.string(),
        type: z.string(),
        site_admin: z.boolean(),
      }),
      committer: z.object({
        login: z.string(),
        id: z.number().gte(0),
        node_id: z.string(),
        avatar_url: z.string(),
        gravatar_id: z.string(),
        url: z.string(),
        html_url: z.string(),
        followers_url: z.string(),
        following_url: z.string(),
        gists_url: z.string(),
        starred_url: z.string(),
        subscriptions_url: z.string(),
        organizations_url: z.string(),
        repos_url: z.string(),
        events_url: z.string(),
        received_events_url: z.string(),
        type: z.string(),
        site_admin: z.boolean(),
      }),
      parents: z.array(
        z.object({ sha: z.string(), url: z.string(), html_url: z.string() })
      ),
    }),
    timestamp: z.number(),
  })
);

export type Commits = z.infer<typeof CommitsSchema>;
