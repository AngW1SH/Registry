export default [
  {
    method: "GET",
    path: "/form",
    handler: "formController.getForms",
    config: {
      policies: [],
    },
  },
];
