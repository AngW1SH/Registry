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
});

export default conf;
