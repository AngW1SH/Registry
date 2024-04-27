export default [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/project",
    handler: "projectController.getAll",
    config: {
      policies: [],
    },
  },
];
