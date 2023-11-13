const conf = () => ({
  meilisearch: {
    config: {
      // Your meili host
      host: process.env.MEILISEARCH_HOST,
      // Your master key or private key
      apiKey: process.env.MEILISEARCH_API_KEY,
      project: {
        transformEntry({ entry }) {
          return {
            ...entry,
            developerRequirements: entry.developerRequirements.map(
              (requirement) => requirement.developerRequirement
            ),
            tags: entry.tags.map((tag) => tag.name),
          };
        },
      },
    },
  },
});

export default conf;
