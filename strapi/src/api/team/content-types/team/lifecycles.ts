const formatName = (name: string): string => {
  const nameArray = name.split(" ");

  nameArray[0] += " ";
  if (nameArray[1]) nameArray[1] = nameArray[1][0].toUpperCase() + ".";
  if (nameArray[2]) nameArray[2] = nameArray[2][0].toUpperCase() + ".";

  return nameArray.join("");
};

export default {
  async beforeUpdate(event) {
    const id = event.params.where.id;

    const existingData = await strapi.entityService.findOne(
      "api::team.team",
      id,
      {
        populate: {
          members: {
            populate: ["user"],
          },
          project: true,
        },
      }
    );

    const membersData = event.params.data.members;

    const membersAddedIds = membersData.connect.length
      ? membersData.connect.map((data) => data.id)
      : [];

    const membersAddedNames = !membersAddedIds.length
      ? []
      : (
          await strapi.entityService.findMany(
            "api::user-in-team.user-in-team",
            {
              filters: {
                id: {
                  $in: membersAddedIds,
                },
              },
              populate: ["user"],
            }
          )
        )
          .filter((member) => member.user)
          .map((member) => formatName(member.user.name));

    const membersRemovedIds = membersData.disconnect.length
      ? membersData.disconnect.map((data) => data.id)
      : [];

    const memberNotRemovedNames = existingData.members
      .filter(
        (member) =>
          !membersRemovedIds.includes(member.id) &&
          member.user &&
          !membersAddedIds.includes(member.id)
      )
      .map((member) => formatName(member.user.name));

    const projectData = event.params.data.project;

    const projectAdded = !projectData.connect.length
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

    const projectName =
      projectAdded ||
      (projectData && projectData.disconnect.length
        ? null
        : existingData.project && existingData.project.name
        ? existingData.project.name
        : "");

    event.params.data.name = memberNotRemovedNames
      .concat(membersAddedNames)
      .join(", ");

    if (projectName) event.params.data.name += " - " + projectName;
  },

  async beforeCreate(event) {
    const membersIds =
      event.params.data.members &&
      event.params.data.members.connect &&
      event.params.data.members.connect.length
        ? event.params.data.members.connect.map((data) => data.id)
        : [];

    const memberNames = !membersIds.length
      ? []
      : (
          await strapi.entityService.findMany(
            "api::user-in-team.user-in-team",
            {
              filters: {
                id: {
                  $in: membersIds,
                },
              },
              populate: ["user"],
            }
          )
        )
          .filter((member) => member.user)
          .map((member) => formatName(member.user.name));

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

    event.params.data.name = memberNames.join(", ");

    if (projectName) event.params.data.name += " - " + projectName;
  },

  async afterUpdate(event) {
    const { result, params } = event;

    const events = await strapi.entityService.findMany("api::project.project", {
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
      filters: {
        teams: {
          id: {
            $eq: params.data.id,
          },
        },
      },
    });

    const meilisearch = strapi.plugin("meilisearch").service("meilisearch");
    meilisearch.updateEntriesInMeilisearch({
      contentType: "api::project.project",
      entries: events,
    });
    // do something to the result;
  },
};
