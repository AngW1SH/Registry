export default {
  async beforeUpdate(event) {
    const id = event.params.where.id;

    const existingData = await strapi.entityService.findOne(
      "api::request.request",
      id,
      {
        populate: ["team", "project"],
      }
    );

    const teamData = event.params.data.team;
    const projectData = event.params.data.project;

    const teamAdded =
      !teamData || !teamData.connect || !teamData.connect.length
        ? null
        : (
            await strapi.entityService.findOne(
              "api::team.team",
              teamData.connect[0].id,
              {
                fields: ["name"],
              }
            )
          ).name;

    const projectAdded =
      !projectData || !projectData.connect || !projectData.connect.length
        ? null
        : (
            await strapi.entityService.findOne(
              "api::project.project",
              projectData.connect[0].id,
              {
                fields: ["name"],
              }
            )
          ).name;

    const teamName =
      teamAdded ||
      (teamData && teamData.disconnect.length
        ? " "
        : existingData.team && existingData.team.name
        ? existingData.team.name
        : " ");
    const projectName =
      projectAdded ||
      (projectData && projectData.disconnect.length
        ? " "
        : existingData.project && existingData.project.name
        ? existingData.project.name
        : " ");

    event.params.data.name = "(" + teamName + ") - (" + projectName + ")";
  },

  async beforeCreate(event) {
    const teamName =
      event.params.data.team &&
      event.params.data.team.connect &&
      event.params.data.team.connect.length
        ? (
            await strapi.entityService.findOne(
              "api::team.team",
              event.params.data.team.connect[0].id,
              {
                fields: ["name"],
              }
            )
          ).name
        : "";

    const projectName =
      event.params.data.project &&
      event.params.data.project.connect &&
      event.params.data.project.connect.length
        ? (
            await strapi.entityService.findOne(
              "api::project.project",
              event.params.data.project.connect[0].id,
              {
                fields: ["name"],
              }
            )
          ).name
        : null;

    event.params.data.name = "(" + teamName + ") - (" + projectName + ")";
  },
};
