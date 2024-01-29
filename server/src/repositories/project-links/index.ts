import { strapi } from "@/db/strapi/client";
import { selectProjectLinks } from "@/db/strapi/queries/project";
import { ProjectLinkStrapi } from "@/db/strapi/types/components/project-link";
import { ServerError } from "@/helpers/errors";
import projectRepository from "../project";

const projectLinksRepositoryFactory = () => {
  return Object.freeze({ add, deleteLink });

  async function add(projectSlug: string, platformId: number, link: string) {
    const projectId = await projectRepository.getInternalId(projectSlug);

    const params = {
      populate: {
        projectLink: selectProjectLinks(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch project links");

    if (!response.data.attributes.projectLink)
      throw new ServerError("Couldn't find project's projectLink");

    const projectLinks: ProjectLinkStrapi[] =
      response.data.attributes.projectLink;

    const body = {
      data: {
        projectLink: [...projectLinks, { platform: platformId, link }],
      },
    };

    const createResponse = await strapi.put("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      body,
    });

    if (!response) throw new ServerError("Couldn't update project links");

    return 200;
  }

  async function deleteLink(projectSlug: string, linkId: number) {
    const projectId = await projectRepository.getInternalId(projectSlug);

    const params = {
      populate: {
        projectLink: selectProjectLinks(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch project links");

    if (!response.data.attributes.projectLink)
      throw new ServerError("Couldn't find project's projectLink");

    const projectLinks: ProjectLinkStrapi[] =
      response.data.attributes.projectLink;

    const body = {
      data: {
        projectLink: projectLinks.filter((link) => link.id != linkId),
      },
    };

    const createResponse = await strapi.put("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      body,
    });

    if (!response) throw new ServerError("Couldn't update project links");

    return 200;
  }
};

const projectLinksRepository = projectLinksRepositoryFactory();

export default projectLinksRepository;
