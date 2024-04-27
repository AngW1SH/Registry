export default [
  {
    method: "GET",
    path: "/project",
    handler: "projectController.getAll",
    config: {
      policies: [],
    },
  },
];
