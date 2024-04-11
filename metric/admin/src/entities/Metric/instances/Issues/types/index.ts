import { IGenericMetric, MetricName } from "@/entities/Metric/types";
import { z } from "zod";

export interface IssuesMetric extends IGenericMetric {
  name: MetricName.Issues;
  data: Issues;
}

export const IssuesSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.object({
      url: z.string(),
      repository_url: z.string(),
      labels_url: z.string(),
      comments_url: z.string(),
      events_url: z.string(),
      html_url: z.string(),
      id: z.number().gte(0),
      node_id: z.string(),
      number: z.number().gte(0),
      title: z.string(),
      user: z.object({
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
      labels: z.array(
        z.object({
          id: z.number().gte(0),
          node_id: z.string(),
          url: z.string(),
          name: z.string(),
          description: z.string().optional(),
          color: z.string(),
          default: z.boolean(),
        })
      ),
      state: z.string(),
      locked: z.boolean(),
      assignee: z
        .object({
          login: z.string(),
          id: z.number().gte(0),
          node_id: z.string(),
          avatar_url: z.string(),
          gravatar_id: z.string(),
        })
        .or(z.null()),
      assignees: z.array(
        z.object({
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
        })
      ),
      milestone: z
        .object({
          url: z.string(),
          html_url: z.string(),
          labels_url: z.string(),
          id: z.number().gte(0),
          node_id: z.string(),
          number: z.number().gte(0),
          state: z.string(),
          title: z.string(),
          description: z.string().optional(),
          creator: z.object({
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
          }),
        })
        .or(z.null()),
      comments: z.number().gte(0),
      created_at: z.string(),
      updated_at: z.string(),
      closed_at: z.string().nullable(),
      author_association: z.string(),
      body: z.string().optional(),
      reactions: z.object({
        url: z.string(),
        total_count: z.number().gte(0),
        "+1": z.number().gte(0),
        "-1": z.number().gte(0),
        laugh: z.number().gte(0),
        hooray: z.number().gte(0),
        confused: z.number().gte(0),
        heart: z.number().gte(0),
        rocket: z.number().gte(0),
        eyes: z.number().gte(0),
      }),
      timeline_url: z.string(),
      performed_via_github_app: z
        .object({
          id: z.number().gte(0),
          node_id: z.string(),
          owner: z.object({
            login: z.string(),
            id: z.number().gte(0),
            node_id: z.string(),
            url: z.string(),
            repos_url: z.string(),
          }),
        })
        .or(z.null()),
      state_reason: z.string().nullable(),
    }),
    timestamp: z.number(),
  })
);

export type Issues = z.infer<typeof IssuesSchema>;
