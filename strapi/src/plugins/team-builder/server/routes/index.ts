export default [
  {
    method: "GET",
    path: "/form",
    handler: "formController.getForms",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/student/:formId",
    handler: "userController.getUsers",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/generate",
    handler: "teamDraftController.generateTeams",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/create",
    handler: "draftController.createDraft",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/draft",
    handler: "draftController.getDrafts",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/draft/:id",
    handler: "draftController.getDraftById",
    config: {
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/draft/:id",
    handler: "draftController.saveDraft",
    config: {
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/draft/:id",
    handler: "draftController.deleteDraft",
    config: {
      policies: [],
    },
  },
];
