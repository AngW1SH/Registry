const conf = () => ({
  meilisearch: {
    config: {
      // Your meili host
      host: process.env.MEILISEARCH_HOST,
      // Your master key or private key
      apiKey: process.env.MEILISEARCH_API_KEY,
      project: {
        entriesQuery: {
          populate: {
            teams: {
              populate: {
                administrators: false,
                members: {
                  populate: {
                    user: true,
                  },
                },
              },
            },
            developerRequirements: true,
            tags: true,
          },
        },
        transformEntry({ entry }) {
          return {
            ...entry,
            developerRequirements:
              entry.developerRequirements?.map(
                (requirement) => requirement.developerRequirement
              ) || [],
            tags: entry.tags?.map((tag) => tag.name) || [],
          };
        },
      },
      "user-role": {
        entriesQuery: {
          populate: {
            aliases: true,
          },
        },
        transformEntry({ entry }) {
          return {
            ...entry,
            developerRequirements:
              entry.aliases?.map((requirement) => requirement.alias) || [],
          };
        },
      },
    },
  },
  "team-builder": {
    enabled: true,
    resolve: "./src/plugins/team-builder",
  },
  "form-import": {
    enabled: true,
    resolve: "./src/plugins/form-import",
  },
  "track-it": {
    enabled: true,
    resolve: "./src/plugins/track-it",
  },
});

export default conf;
