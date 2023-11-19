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
    path: "/form",
    handler: "myController.getForms",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/student/:formId",
    handler: "myController.getStudents",
    config: {
      policies: [],
    },
  },
];
