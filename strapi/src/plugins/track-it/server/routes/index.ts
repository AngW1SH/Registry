export default [
  {
    method: "GET",
    path: "/project",
    handler: "projectController.getAll",
    config: {
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/project/:id",
    handler: "projectController.update",
    config: {
      policies: [],
    },
  },
];
